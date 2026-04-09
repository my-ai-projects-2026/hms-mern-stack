import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import ApiError from "../../../../utils/ApiError";
import { User } from "../models/user.model";
import { logActivity } from "../../../lib/activity";

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;

    // Authorization: Only allow the user themselves or an admin to fetch the profile
    if (currentUser.id !== id || currentUser.role !== "patient") {
      return next(new ApiError("Forbidden: You are not authorized to view this profile", 403));
    }

    // Handle potential ObjectId casting or fallback to string ID (since better-auth uses CUID/NanoID)
    const queryId = id?.length === 24 ? new mongoose.Types.ObjectId(id as string) : id;

    // Query using the User model mapped to the `user` collection
    const user = await User.findOne(
      { _id: queryId as mongoose.Types.ObjectId },
      { projection: { password: 0, __v: 0 } }
    );

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const currentUser = (req as any).user;
    console.log(currentUser.id, id);
    // Authorization: Only allow the authorized patient to update their own profile
    if (currentUser.id !== id) {
      return next(new ApiError("Forbidden: You are not authorized to update this profile", 403));
    }

    const queryId = id?.length === 24 ? new mongoose.Types.ObjectId(id as string) : id;

    // Prevent modifying sensitive data like password if it happens to be passed
    if (req.body.password) {
      delete req.body.password;
    }

    const user = await User.findOneAndUpdate(
      { _id: queryId },
      { $set: req.body },
      { new: true, projection: { password: 0, __v: 0 }, runValidators: true }
    );

    if (!user) {
      return next(new ApiError("User not found", 404));
    }

    // Log the profile update action
    await logActivity(currentUser.id, "UPDATE_PROFILE", `User profile for ${user.name || id} was updated.`);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const fetchAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    const query: any = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name as string, $options: "i" }; // Case-insensitive matching
    }
    if (req.query.role) {
      query.role = req.query.role as string;
    }

    const total = await User.countDocuments(query);

    const users = await User.find(query, { password: 0, __v: 0 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};