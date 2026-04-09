import mongoose from "mongoose";

export const connectDb = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGODB_URI as string);
      console.log(`MongoDB Connected: ${connect.connection.host}`);
   } catch (error) {
      console.error(`Error: ${error}`);
      process.exit(1);
   }
}

