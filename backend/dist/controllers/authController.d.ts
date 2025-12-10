import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
export declare function register(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function requestOtp(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function verifyOtp(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function login(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function forgotPassword(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function resetPassword(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getMe(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=authController.d.ts.map