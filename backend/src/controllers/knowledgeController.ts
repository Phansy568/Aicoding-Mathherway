import { Request, Response } from 'express';
import { Topic } from '../models/Topic';

export const knowledgeController = {
  getGraph: async (req: Request, res: Response): Promise<void> => {
    try {
      const topics = await Topic.find();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: '获取知识图谱失败' });
    }
  },

  getTopic: async (req: Request, res: Response): Promise<void> => {
    try {
      const topic = await Topic.findById(req.params.id);
      if (!topic) {
        res.status(404).json({ error: '知识点不存在' });
        return;
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: '获取知识点失败' });
    }
  }
}; 