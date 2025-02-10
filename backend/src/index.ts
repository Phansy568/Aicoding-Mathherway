import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router as authRoutes } from './routes/auth';
import { router as knowledgeRoutes } from './routes/knowledge'; 
import { router as learningRoutes } from './routes/learning';
import { router as aiRoutes } from './routes/ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/ai', aiRoutes);

// 数据库连接
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('数据库连接成功');
    app.listen(port, () => {
      console.log(`服务器运行在 http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('数据库连接失败:', err)); 