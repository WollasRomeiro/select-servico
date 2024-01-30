import * as mongoose from 'mongoose';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export const ImageSchema = new mongoose.Schema({
  workerId: Number,
  imageBase64: String,
});
