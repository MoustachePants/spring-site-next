'use server';

import {Spring} from "@/models/types/spring";
import {connectDB} from "@/lib/mongoConnection";
import {SpringModel} from "@/models/schemas/spring.model";
import {ActionResponse} from "@/models/types/actionResponse";

const listSprings = async (): Promise<ActionResponse<Spring[]>> => {
  try {
    await connectDB("Springs");
    const springs = await SpringModel.find().lean();

    if (springs.length === 0) {
      console.error("No springs found");
      return { status: 'error', error: new Error("No springs found") };
    }

    // Convert to plain objects (handles ObjectIds, Dates, etc.)
    const plainSprings = JSON.parse(JSON.stringify(springs)) as Spring[];

    return {
      status: 'success',
      data: plainSprings,
    };
  } catch (error) {
    return { status: 'error', error: error as Error };
  }
};

export default listSprings;
