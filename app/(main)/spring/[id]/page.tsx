import { notFound } from 'next/navigation';
import getSpring from '@/app/actions/getSpring';
import { PanelHeader } from '@/components/ui/Panel/PanelHeader';
import SpringDetailsContent from '@/components/pageContent/SpringDetailsContent/SpringDetailsContent';
import { NextPage } from 'next';
import { Spring } from '@/models/types/spring';
import { getSpringJsonLd } from '@/utils/seo';

type Props = {
  params: Promise<{ id: string }>;
};

const SpringPage: NextPage<Props> = async ({ params }) => {
  const { id } = await params;

  if (!id) return notFound();

  try {
    const response = await getSpring(id);

    if (response.status !== 'success' || !response.data) return notFound();
    const spring = response.data as Spring;

    const { attractionLd, breadcrumbLd } = getSpringJsonLd(spring);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <PanelHeader  />
        <SpringDetailsContent spring={spring} />
      </>
    );
  } catch (error) {
    console.error('Error fetching spring:', error);
    return notFound();
  }
};

export default SpringPage;
