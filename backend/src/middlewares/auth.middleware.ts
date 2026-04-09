import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request, Response, NextFunction } from "express";
import ApiError from "../../utils/ApiError";

export type Role =
   "patient"
   | "doctor"
   | "admin"
   | "nurse"
   | "lab_technician"
   | "radiologist"
   | "pharmacist"
   | "receptionist"
   | "accountant"
   | "hospital_admin"
   | "system_admin";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const session = await auth.api.getSession({
         headers: fromNodeHeaders(req.headers),
      });
      if (!session) {
         return next(new ApiError("Unauthorized", 401));
      }

      (req as any).session = session;
      (req as any).user = session.user;
      next();
   }
   catch (error) {
      next(error);
   }
}


export const checkRoleMiddleware = (allowedRoles: Role[]) => {

   return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (!allowedRoles.includes(user.role)) {
         return next(new ApiError("Forbidden: You are not authorized to perform this action", 403));
      }
      next();
   }
}