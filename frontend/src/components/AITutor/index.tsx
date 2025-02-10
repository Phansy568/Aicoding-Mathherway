import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Message, Role } from './types';
import { aiAPI } from '../../services/api';
import { addNode, addEdge, updateNode } from '../../store/slices/graphSlice';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleGraphEdit = (command: string, content: any) => {
    switch (command) {
      case 'ADD_NODE':
        dispatch(addNode(content));
        break;
      case 'ADD_EDGE':
        dispatch(addEdge(content));
        break;
      case 'UPDATE_NODE':
        dispatch(updateNode(content));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiAPI.chat(input);
      
      // 检查是否包含图谱编辑命令
      if (response.data.graphEdit) {
        handleGraphEdit(
          response.data.graphEdit.command,
          response.data.graphEdit.content
        );
      }

      const aiMessage: Message = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，我现在无法回答您的问题。请稍后再试。',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="bg-white p-4 shadow-sm rounded-t-lg">
        <h1 className="text-xl font-bold">AI 数学导师</h1>
        <p className="text-gray-600">我是你的专属数学辅导老师，有任何问题都可以问我</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white shadow'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-sm rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? '思考中...' : '发送'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITutor; 