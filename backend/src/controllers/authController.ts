import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const authController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      
      // 检查用户是否已存在
      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });
      
      if (existingUser) {
        res.status(400).json({ error: '用户名或邮箱已被注册' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ 
        username, 
        email, 
        password: hashedPassword,
        learningPath: [],
        preferences: {
          learningStyle: 'visual',
          difficultyLevel: 'medium'
        }
      });
      
      await user.save();
      
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );
      
      res.status(201).json({ 
        message: '注册成功',
        token,
        user: {
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error('注册错误:', error);
      res.status(500).json({ error: '注册失败，请稍后重试' });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: '用户不存在' });
        return;
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ error: '密码错误' });
        return;
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: '登录失败' });
    }
  }
}; 