import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB runtime error:", err);
    });
  } catch (error) {
    console.error(`❌ Initial connection failed: ${error.message}`);
    process.exit(1);
  }
};
