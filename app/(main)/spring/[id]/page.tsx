import { Metadata } from 'next';
import getSpring from '@/app/actions/getSpring';
import SpringPageClient from './SpringPageClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await getSpring(id);

  if (response.status !== 'success' || !response.data) {
    return {
      title: 'מעיין לא נמצא | המעיין הנובע',
    };
  }

  const spring = response.data;
  const title = `${spring.name} | המעיין הנובע`;
  const description =
    spring.description ||
    `${spring.name} - ${spring.mainRegion}, ${spring.subRegion}. מידע עדכני על המעיין כולל הוראות הגעה ותמונות.`;

  const imageUrl = spring.images?.[0]?.image || '/og-image.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'article',
      locale: 'he_IL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SpringPage({ params }: Props) {
  const { id } = await params;
  return <SpringPageClient id={id} />;
}
