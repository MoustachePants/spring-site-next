'use server';

import { connectDB } from '@/lib/mongoConnection';
import { SpringUpdateModel } from '@/models/schemas/springUpdate.model';
import { ActionResponse } from '@/models/types/actionResponse';
import { SpringUpdate } from '@/models/types/springUpdate';
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
    await connectDB('Springs-Refactored');

    const { springId, ...updateData } = payload;

    const newUpdate = new SpringUpdateModel({
      ...updateData,
      spring: springId,
      createdAt: new Date(),
    });

    const savedUpdate = await newUpdate.save();
    const plainUpdate = JSON.parse(JSON.stringify(savedUpdate.toObject())) as SpringUpdate;

    revalidatePath(`/spring/${springId}`);

    return {
      status: 'success',
      data: plainUpdate,
    };
  } catch (error) {
    console.error('Error adding spring update:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default addSpringUpdate;

