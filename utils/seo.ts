import { Spring } from '@/models/types/spring';
import { env } from '@/lib/env.config';
import { getSpringImage } from '@/utils/springImage';

export function getSpringJsonLd(spring: Spring) {
  const springUrl = `${env.baseUrl}/spring/${spring._id}`;

  // Main Attraction Data
  const attractionLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: spring.name,
    description: spring.description,
    url: springUrl,
    image: spring.images?.map((_, index) => `${env.baseUrl}${getSpringImage(spring, index)}`),
    address: {
      '@type': 'PostalAddress',
      addressLocality: spring.subRegion,
      addressRegion: spring.mainRegion,
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: spring.location.coordinates.pool[0],
      longitude: spring.location.coordinates.pool[1],
    },
    touristType: 'Nature',
  };

  // Breadcrumb Data
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'בית',
        item: env.baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: spring.mainRegion,
        item: `${env.baseUrl}/?region=${encodeURIComponent(spring.mainRegion)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: spring.name,
        item: springUrl,
      },
    ],
  };

  return { attractionLd, breadcrumbLd };
}
