import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, type Role } from "better-auth/plugins";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],
  plugins: [
    admin({
      defaultRole: "patient",
      user: {
        additionalFields: {
          specialization: {
            type: "string",
            required: false
          },
          department: {
            type: "string",
            required: false
          },
          gender: {
            type: "string",
            required: false
          },
          bloodGroup: {
            type: "string",
            required: false

          },
          medicalHistory: {
            type: "string",
            required: false
          },
          address: {
            type: "string",
            required: false

          },
          age: {
            type: "number",
            required: false
          },
          status: {
            type: "string",
            required: false,
            defaultValue: "active"
          },
          prescription: {
            type: "string[]",
            required: false
          },
          appointment: {
            type: "string[]",
          }

        }
      }
    })
  ]
});
