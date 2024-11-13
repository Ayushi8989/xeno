import mongoose from 'mongoose';
import { DB_NAME } from '../constants';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected \n HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("mongodb-uri: ", process.env.MONGODB_URI)
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;