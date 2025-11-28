'use server';

import {Spring} from "@/models/types/spring";
import {connectDB} from "@/lib/mongoConnection";
import {SpringModel} from "@/models/schemas/spring.model";
import {ActionResponse} from "@/models/types/actionResponse";

const listSprings = async (): Promise<ActionResponse<Spring[]>> => {
  try {
    await connectDB("Springs");
    const springs = await SpringModel.find();

    if (springs.length === 0) {
      console.error("No springs found");
      return { status: 'error', error: new Error("No springs found") };
    }

    return {
      status: 'success',
      data: springs as Spring[],
    };
  } catch (error) {
    return { status: 'error', error: error as Error };
  }
};

export default listSprings;
