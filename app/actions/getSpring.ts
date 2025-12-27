'use server';

import { Spring } from '@/models/types/spring';
import { SpringUpdate } from '@/models/types/springUpdate';
import {
  getSpringKey,
  getUpdatesPattern,
  getRedisClient,
  jsonGet,
  jsonMGet,
} from '@/lib/redisConnection';
import { ActionResponse } from '@/models/types/actionResponse';

const getSpring = async (id: string): Promise<ActionResponse<Spring>> => {
  try {
    const redis = getRedisClient();
    const key = getSpringKey(id);

    const spring = await jsonGet<Spring>(key);

    if (!spring) {
      console.error(`Spring with id ${id} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${id} was not found`) };
    }

    // Fetch updates from separate keys (updates:springId:*)
    const updateKeys = await redis.keys(getUpdatesPattern(id));
    if (updateKeys && updateKeys.length > 0) {
      const updatesData = await jsonMGet<SpringUpdate>(updateKeys);
      const updates = updatesData.filter((u): u is SpringUpdate => u !== null);
      updates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      spring.updates = updates;
    }

    return {
      status: 'success',
      data: spring,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default getSpring;
