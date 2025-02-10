import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { calculateMasteryLevel } from '../utils';

export const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const learning = useSelector((state: RootState) => state.learning);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">基本信息</h2>
        <div className="space-y-2">
          <p>用户名：{user.username}</p>
          <p>邮箱：{user.email}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">学习进度</h2>
        <div className="space-y-4">
          {Object.entries(learning.progress).map(([topicId, progress]) => (
            <div key={topicId} className="flex items-center justify-between">
              <span>{topicId}</span>
              <div className="flex items-center space-x-4">
                <div className="w-48 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span>{calculateMasteryLevel(progress)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 