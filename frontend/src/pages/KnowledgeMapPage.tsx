import React from 'react';
import { KnowledgeGraph } from '../components/KnowledgeGraph';
import { knowledgeGraphData } from '../data/knowledgeGraphData';

export const KnowledgeMapPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">高中数学知识图谱</h1>
      <div className="border rounded-lg shadow-lg">
        <KnowledgeGraph
          data={knowledgeGraphData}
          width={1000}
          height={600}
        />
      </div>
    </div>
  );
}; 