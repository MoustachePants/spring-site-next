'use server';

import { Spring } from '@/models/types/spring';
import { connectDB } from '@/lib/mongoConnection';
import { SpringModel } from '@/models/schemas/spring.model';
import { ActionResponse } from '@/models/types/actionResponse';
import { SpringUpdateModel } from '@/models/schemas/springUpdate.model';

const getSpring = async (id: string): Promise<ActionResponse<Spring>> => {
  try {
    await connectDB('Springs-Refactored');
    const spring = (await SpringModel.findById(id).lean()) as any;

    if (!spring || !spring.name || spring.name === '') {
      console.error(`Spring with id ${id} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${id} was not found`) };
    }

    const updates = await SpringUpdateModel.find().lean();

    if (updates && updates.length > 0) {
      spring.updates = updates;
    }

    const plainSpring = JSON.parse(JSON.stringify(spring)) as Spring;

    return {
      status: 'success',
      data: plainSpring,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 'error', error: new Error(message) };
  }
};

export default getSpring;
