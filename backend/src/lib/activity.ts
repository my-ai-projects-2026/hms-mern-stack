import mongoose from "mongoose";
import { ActivityLog } from "../modules/logs/models/activitylog.model";

/**
 * Log user activity to the database for audit trailing.
 * 
 * @param userId - ID of the user performing the action
 * @param action - Action identifier (e.g., "UPDATE_PASSWORD", "DELETE_DOCUMENT")
 * @param details - Optional details describing the event
 */
export const logActivity = async (
   userId: string | mongoose.Types.ObjectId,
   action: string,
   details?: string | Record<string, any>
) => {
   try {
      // Stringify the details object if needed so it can be safely stored as a string
      const parsedDetails = typeof details === "object" ? JSON.stringify(details) : details;

      // Safe casting logic matching your controller approach
      let queryId: any = userId;
      if (typeof userId === "string" && userId.length === 24) {
         queryId = new mongoose.Types.ObjectId(userId);
      }

      await ActivityLog.create({
         user: queryId,
         action,
         details: parsedDetails,
      });
   } catch (error) {
      // Swallow the error so audit trailing problems don't crash the main user actions.
      console.error("Audit Trailing Error: Failed to write to ActivityLog.", error);
   }
};
