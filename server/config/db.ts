import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
