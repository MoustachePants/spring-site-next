import { MetadataRoute } from 'next';
import { env } from '@/lib/env.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${env.baseUrl}/sitemap.xml`,
  };
}
