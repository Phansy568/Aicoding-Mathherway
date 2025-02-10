import mongoose, { Document } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  category: string;
  description: string;
  content: string;
  level: string;
  difficulty: number;
  prerequisites: string[];
  exercises: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
    difficulty: string;
  }>;
}

const topicSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  content: String,
  level: String,
  difficulty: Number,
  prerequisites: [String],
  exercises: [{
    question: String,
    options: [String],
    answer: String,
    explanation: String,
    difficulty: String
  }]
});

export const Topic = mongoose.model<ITopic>('Topic', topicSchema); 