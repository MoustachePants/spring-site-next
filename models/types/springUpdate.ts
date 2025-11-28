export interface SpringUpdate {
  _id: string;
  createdAt: Date | string;
  user: string;
  update: string;
  waterStatus: number;
  cleanliness: number;
  spring: string; // ObjectId reference to Spring
  __v?: number;
}

