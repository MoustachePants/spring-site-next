import { MetadataRoute } from 'next';
import { getRedisClient, getSpringsPattern, jsonMGet } from '@/lib/redisConnection';
import { Spring } from '@/models/types/spring';
import { env } from '@/lib/env.config';

const BASE_URL = env.baseUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  try {
    const redis = getRedisClient();
    const keys = await redis.keys(getSpringsPattern());

    if (!keys || keys.length === 0) {
      return staticPages;
    }

    const springsData = await jsonMGet<Spring>(keys);
    const springs = springsData.filter((s): s is Spring => s !== null);

    const springPages: MetadataRoute.Sitemap = springs.map((spring) => ({
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
