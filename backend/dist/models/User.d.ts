import mongoose, { Document } from "mongoose";
import { Role } from "../config/roles";
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: Role;
    isVerified: boolean;
    otpHash?: string | null;
    otpExpiresAt?: Date | null;
    resetTokenHash?: string | null;
    resetExpiresAt?: Date | null;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
//# sourceMappingURL=User.d.ts.map