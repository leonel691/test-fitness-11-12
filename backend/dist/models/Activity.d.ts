import mongoose, { Document } from "mongoose";
export type ActivityType = "user_registered" | "user_login" | "coach_created";
export interface IActivity extends Document {
    type: ActivityType;
    email?: string;
    description: string;
    createdAt: Date;
}
export declare const Activity: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IActivity>;
//# sourceMappingURL=Activity.d.ts.map