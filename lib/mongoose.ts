import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_STRING;

let connected = false;

export const connectDB = async () => {
  try {
    if (!mongoURI) {
      throw new Error("can't find mongoURI");
    }
    if (connected) {
      return;
    }
    const dbConnect = await mongoose.connect(mongoURI);
    console.log("MongoDB connection successful!");
    connected = true;
    return dbConnect;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection open to ${mongoURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  connected = false;
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log("process end");
  process.exit(0);
});
