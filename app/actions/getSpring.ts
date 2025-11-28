'use server';

import {Spring} from "@/models/types/spring";
import {connectDB} from "@/lib/mongoConnection";
import {SpringModel} from "@/models/schemas/spring.model";
import {ActionResponse} from "@/models/types/actionResponse";
import {SpringUpdateModel} from "@/models/schemas/springUpdate.model";

const getSpring = async (id:string): Promise<ActionResponse<Spring>> => {
  try {
    await connectDB("Springs");
    const spring = await SpringModel.findById(id) as Spring;

    if (!spring || spring.name === "") {
      console.error(`Spring with id ${id} was not found`);
      return { status: 'error', error: new Error(`Spring with id ${id} was not found`) };
    }

    // TODO
    // const updates = await SpringUpdateModel.find();
    // console.log(updates);
    // spring.updates = updates.map(update => update.toObject());

    return {
      status: 'success',
      data: spring,
    };
  } catch (error) {
    return { status: 'error', error: error as Error };
  }
};

export default getSpring;
