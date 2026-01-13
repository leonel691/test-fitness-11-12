import mongoose, { Schema, Document } from "mongoose";

export type ActivityType = "user_registered" | "user_login" | "coach_created";

export interface IActivity extends Document {
  type: ActivityType;
  email?: string;
  description: string;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    type: { type: String, required: true },
    email: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Activity = mongoose.model<IActivity>("Activity", activitySchema);



