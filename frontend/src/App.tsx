import React from 'react';
import KnowledgeGraph from './components/KnowledgeGraph';
import AITutor from './components/AITutor';
import Layout from './components/Layout';
import Legend from './components/KnowledgeGraph/Legend';
import { knowledgeGraphData } from './data/knowledgeGraphData';

const App: React.FC = () => {
  return (
    <Layout>
      <div className="flex gap-6">
        <div className="w-1/2">
          <div className="h-[calc(100vh-8rem)]">
            <KnowledgeGraph 
              data={knowledgeGraphData} 
              width={600} 
              height={window.innerHeight - 250} 
            />
            <Legend />
          </div>
        </div>
        <div className="w-1/2">
          <AITutor />
        </div>
      </div>
    </Layout>
  );
};

export default App; 