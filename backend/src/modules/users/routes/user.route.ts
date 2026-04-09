import express from "express";
import { getUserById, updateUser, fetchAllUsers } from "../controllers/user.controller";
import { authMiddleware, checkRoleMiddleware } from "../../../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, checkRoleMiddleware(["admin", "doctor", "nurse", "hospital_admin", "system_admin", "receptionist", "patient"]), fetchAllUsers);

userRouter.get("/:id", authMiddleware, getUserById);
userRouter.put(
   "/:id",
   authMiddleware,
   checkRoleMiddleware(["admin", "doctor", "nurse", "patient"]),
   updateUser);


export default userRouter;