import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME} `, { writeConcern: { w: 'majority' } }
    );
    console.log(
      `\n MongoDB Connected! \n HOST: ${connectionInstance.connection.name} `
    );
  } catch (error) {
    console.log("mongodb-uri: ", process.env.MONGODB_URI)
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;