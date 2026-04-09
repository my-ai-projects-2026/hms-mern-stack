import dotenv from "dotenv";
import express, {
   type Application,
   type Request,
   type Response,
   type NextFunction
} from "express";

import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFoundHandler, globalErrorHandler } from "./middlewares/error.middleware";
import { connectDb } from "./config/db";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

import userRouter from "./modules/users/routes/user.route";
import activityRouter from "./modules/logs/routes/activity.route";


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors({
   origin: process.env.FRONTEND_URL || "http://localhost:3000",
   credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
   allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}))

app.use(helmet({
   crossOriginResourcePolicy: { policy: "cross-origin" },

}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
   app.use(morgan("dev"));
}

//end middleware

app.get("/", (req: Request, res: Response) => {
   res.send("Hello Arnold World!!!");
});

app.get("/api/me", async (req, res) => {
   const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
   });
   console.log("This is a session");
   return res.json(session);
});

app.use("/api/users", userRouter);
app.use("/api/activities", activityRouter);

app.all("/api/auth/*splat", toNodeHandler(auth));
// Error handling middlewares must be AFTER all routes
app.use(notFoundHandler);
app.use(globalErrorHandler);


connectDb().then(() => {
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
   });
}).catch((error) => {
   console.error(`Error: failed to connect to database ${error}`);
   process.exit(1);
})
