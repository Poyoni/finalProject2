import mongoose from 'mongoose';
import dotenv from 'dotenv';
import terrorAttacksSeed from './seedTerrorAttacks';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    await terrorAttacksSeed();
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;