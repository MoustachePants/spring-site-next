'use server';

import { Spring } from '@/models/types/spring';
import { getRedisClient, getSpringsPattern, jsonMGet } from '@/lib/redisConnection';
import { ActionResponse } from '@/models/types/actionResponse';

const listSprings = async (): Promise<ActionResponse<Spring[]>> => {
  try {
    const redis = getRedisClient();

    const keys = await redis.keys(getSpringsPattern());
    if (!keys || keys.length === 0) {
      return {
        status: 'success',
        data: [],
      };
    }

    const springsData = await jsonMGet<Spring>(keys);

    const springs: Spring[] = springsData.filter((data): data is Spring => data !== null);

    return {
      status: 'success',
      data: springs,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default listSprings;
