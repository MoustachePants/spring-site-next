'use server';

import { Spring } from '@/models/types/spring';
import { getSpringKey, jsonGet, jsonSet } from '@/lib/redisConnection';
import { ActionResponse } from '@/models/types/actionResponse';

const updateSpring = async (id: string, spring: Spring): Promise<ActionResponse<Spring>> => {
  try {
    const key = getSpringKey(id);

    const existingSpring = await jsonGet<Spring>(key);
    if (!existingSpring) {
      console.error(`Spring with id ${id} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${id} was not found`) };
    }

    const { updates, ...springDataWithoutUpdates } = spring;

    const updatedSpring: Spring = {
      ...existingSpring,
      ...springDataWithoutUpdates,
      _id: id,
      lastUpdate: new Date().toISOString(),
    };

    delete updatedSpring.updates;

    await jsonSet(key, updatedSpring);

    return {
      status: 'success',
      data: updatedSpring,
    };
  } catch (error) {
    console.error('Error updating spring:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default updateSpring;
