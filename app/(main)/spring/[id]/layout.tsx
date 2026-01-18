import { Metadata } from 'next';
import getSpring from '@/app/actions/getSpring';
import { GalleryContextProvider } from '@/context/GalleryContext';
import { env } from '@/lib/env.config';
import { getSpringImage } from '@/utils/springImage';

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

  const imagePath = spring.images?.length > 0 ? getSpringImage(spring) : '/og-image.png';
  const imageUrl = `${env.baseUrl}${imagePath}`;

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
    alternates: {
      canonical: `/spring/${id}`,
      languages: {
        'he-IL': `/spring/${id}`,
      },
    },
  };
}

export default function SpringLayout({ children }: { children: React.ReactNode }) {
  return (
    <GalleryContextProvider>
      <section>{children}</section>
    </GalleryContextProvider>
  );
}
