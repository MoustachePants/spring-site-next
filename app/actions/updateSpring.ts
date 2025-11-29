'use server';

import { Spring } from '@/models/types/spring';
import { connectDB } from '@/lib/mongoConnection';
import { SpringModel } from '@/models/schemas/spring.model';
import { ActionResponse } from '@/models/types/actionResponse';

const updateSpring = async (id: string, spring: Spring): Promise<ActionResponse<Spring>> => {
  try {
    await connectDB('Springs-Refactored');

    const { _id, updates, ...updateData } = spring;

    const dataToUpdate = {
      ...updateData,
      lastUpdate: new Date(),
    };

    const updatedSpring = await SpringModel.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedSpring) {
      console.error(`Spring with id ${id} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${id} was not found`) };
    }

    const plainSpring = JSON.parse(JSON.stringify(updatedSpring)) as Spring;

    return {
      status: 'success',
      data: plainSpring,
    };
  } catch (error) {
    console.error('Error updating spring:', error);
    return { status: 'error', error: error as Error };
  }
};

export default updateSpring;
