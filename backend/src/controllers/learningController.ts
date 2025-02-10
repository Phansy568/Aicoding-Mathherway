import { Request, Response } from 'express';
import { User } from '../models/User';

export const learningController = {
  getUserProgress: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ error: '用户不存在' });
        return;
      }
      res.json(user.learningPath);
    } catch (error) {
      res.status(500).json({ error: '获取学习进度失败' });
    }
  },

  updateProgress: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?._id;
      const { topicId, progress } = req.body;
      await User.findByIdAndUpdate(userId, {
        $set: { [`learningPath.${topicId}`]: progress }
      });
      res.json({ message: '更新进度成功' });
    } catch (error) {
      res.status(500).json({ error: '更新学习进度失败' });
    }
  }
};