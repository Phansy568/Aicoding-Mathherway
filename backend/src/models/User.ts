import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  learningPath: Array<{
    topicId: string;
    progress: number;
    completedExercises: string[];
    masteryLevel: number;
  }>;
  preferences: {
    learningStyle: string;
    difficultyLevel: string;
  };
}

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  learningPath: [{
    topicId: String,
    progress: Number,
    completedExercises: [String],
    masteryLevel: Number
  }],
  preferences: {
    learningStyle: String,
    difficultyLevel: String
  }
});

export const User = mongoose.model<IUser>('User', userSchema); 