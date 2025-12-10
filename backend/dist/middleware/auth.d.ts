import { NextFunction, Request, Response } from "express";
import { Role } from "../config/roles";
export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: Role;
    };
}
export declare function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireRole(roles: Role[]): (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map