import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongoConnection';
import { SpringModel } from '@/models/schemas/spring.model';
import { env } from '@/lib/env.config';

const BASE_URL = env.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/accessibility`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic spring pages
  try {
    await connectDB('Springs-Refactored');
    const springs = await SpringModel.find({}, '_id lastUpdate').lean();

    const springPages: MetadataRoute.Sitemap = springs.map((spring: any) => ({
      url: `${BASE_URL}/spring/${spring._id}`,
      lastModified: spring.lastUpdate ? new Date(spring.lastUpdate) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...springPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}

