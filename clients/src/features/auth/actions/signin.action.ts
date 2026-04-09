import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const signInSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signinServerAction = createServerFn({ method: "POST" })
   .inputValidator(signInSchema)
   .handler(async ({ data }) => {

      const response = await fetch("http://localhost:5000/api/auth/sign-in/email", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:3000"
         },
         body: JSON.stringify(data),
      });

      if (!response.ok) {
         const errorData = await response.json().catch(() => ({ message: "An error occurred during sign in." }));
         throw new Error(errorData.message || "Failed to sign in");
      }

      return await response.json();
   });