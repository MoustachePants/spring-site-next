'use server';

import { getSpringKey, getUpdateKey, jsonGet, jsonSet } from '@/lib/redisConnection';
import { ActionResponse } from '@/models/types/actionResponse';
import { SpringUpdate } from '@/models/types/springUpdate';
import { Spring } from '@/models/types/spring';
import { revalidatePath } from 'next/cache';

type AddSpringUpdatePayload = {
  springId: string;
  waterStatus: number;
  cleanliness: number;
  update?: string;
  user?: string;
};

const addSpringUpdate = async (payload: AddSpringUpdatePayload): Promise<ActionResponse<SpringUpdate>> => {
  try {
    const { springId, ...updateData } = payload;
    const springKey = getSpringKey(springId);
    
    // Check if spring exists
    const spring = await jsonGet<Spring>(springKey);
    if (!spring) {
      console.error(`Spring with id ${springId} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${springId} was not found`) };
    }
    
    // Generate update ID
    const updateId = `${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;
    
    // Create new update document
    const newUpdate: SpringUpdate = {
      _id: updateId,
      user: updateData.user || 'anonymous',
      update: updateData.update || '',
      waterStatus: updateData.waterStatus,
      cleanliness: updateData.cleanliness,
      spring: springId,
      createdAt: new Date().toISOString(),
      __v: 0,
    };
    
    // Store update in separate key: updates:springId:updateId
    const updateKey = getUpdateKey(springId, updateId);
    await jsonSet(updateKey, newUpdate);
    
    // Update spring's lastUpdate timestamp
    const updatedSpring: Spring = {
      ...spring,
      lastUpdate: new Date().toISOString(),
    };
    await jsonSet(springKey, updatedSpring);
    
    revalidatePath(`/spring/${springId}`);
    
    return {
      status: 'success',
      data: newUpdate,
    };
  } catch (error) {
    console.error('Error adding spring update:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default addSpringUpdate;
