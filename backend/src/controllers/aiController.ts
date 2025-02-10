import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 添加 API key 检查函数
async function checkApiKey(): Promise<boolean> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 5
    });
    return true;
  } catch (error: any) {
    console.error('API Key 检查失败:', error.message);
    return false;
  }
}

// 在服务启动时检查 API key
checkApiKey().then(isValid => {
  if (isValid) {
    console.log('OpenAI API Key 有效');
  } else {
    console.error('OpenAI API Key 无效或已过期');
  }
});

export const aiController = {
  chat: async (req: Request, res: Response): Promise<void> => {
    try {
      const { message } = req.body;
      
      console.log('收到问题:', message);
      console.log('使用的 API Key:', process.env.OPENAI_API_KEY?.slice(0, 10) + '...');

      if (!message) {
        res.status(400).json({ error: '请输入问题' });
        return;
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一位专业的数学老师，擅长用通俗易懂的方式解释数学概念。你的回答应该循序渐进，并且多用生活中的例子来解释。"
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const aiResponse = completion.choices[0]?.message?.content;
      console.log('AI 回答:', aiResponse);

      if (!aiResponse) {
        throw new Error('未获得有效回答');
      }

      res.json({ message: aiResponse });
    } catch (error: any) {
      console.error('AI回答错误:', error.message);
      console.error('错误详情:', error);
      res.status(500).json({ 
        error: '获取AI回答失败，请稍后再试',
        details: error.message 
      });
    }
  }
}; 