import Redis from 'ioredis';

const redisConfig = {
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
};

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(redisConfig);

    redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });

    redis.on('connect', () => {
      console.log('Connected to Redis');
    });
  }

  return redis;
}

// Key helpers
export function getSpringKey(id: string): string {
  return `springs:${id}`;
}

export function getSpringsPattern(): string {
  return 'springs:*';
}

export function getUpdateKey(springId: string, updateId: string): string {
  return `updates:${springId}:${updateId}`;
}

export function getUpdatesPattern(springId: string): string {
  return `updates:${springId}:*`;
}

// RedisJSON helpers
export async function jsonGet<T>(key: string): Promise<T | null> {
  const redis = getRedisClient();
  const result = (await redis.call('JSON.GET', key)) as string | null;
  return result ? JSON.parse(result) : null;
}

export async function jsonSet(key: string, value: unknown): Promise<void> {
  const redis = getRedisClient();
  await redis.call('JSON.SET', key, '$', JSON.stringify(value));
}

export async function jsonMGet<T>(keys: string[]): Promise<(T | null)[]> {
  if (keys.length === 0) return [];
  const redis = getRedisClient();
  const results = (await redis.call('JSON.MGET', ...keys, '$')) as (string | null)[];
  return results.map((result) => {
    if (!result) return null;
    const parsed = JSON.parse(result);
    // JSON.MGET returns array wrapped results, unwrap them
    return Array.isArray(parsed) ? parsed[0] : parsed;
  });
}
