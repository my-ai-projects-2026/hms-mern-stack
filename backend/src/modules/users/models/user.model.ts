import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role?: string;
  specialization?: string;
  department?: string;
  gender?: string;
  bloodGroup?: string;
  medicalHistory?: string;
  address?: string;
  age?: number;
  status?: string;
  prescription?: string[];
  appointment?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String },
    role: { type: String, default: "patient" },
    specialization: { type: String },
    department: { type: String },
    gender: { type: String },
    bloodGroup: { type: String },
    medicalHistory: { type: String },
    address: { type: String },
    age: { type: Number },
    status: { type: String, default: "active" },
    prescription: [{ type: String }],
    appointment: [{ type: String }],
  },
  {
    timestamps: true,
    collection: "user", // Matches better-auth default collection name for users
    strict: false, // In case better-auth adds other internal fields
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
