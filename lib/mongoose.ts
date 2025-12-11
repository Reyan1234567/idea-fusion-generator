import mongoose from "mongoose";

const mongoURI = process.env.NEXT_PUBLIC_MONGODB_STRING;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

export const connectDB = async () => {
  try {
    if(!mongoURI){
      throw new Error("can't find mongoURI")
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connection successful!");
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
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log("process end");
  process.exit(0);
});
