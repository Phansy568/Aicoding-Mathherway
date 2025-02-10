import React from 'react';

const Legend: React.FC = () => {
  const categories = [
    { name: '函数', color: '#FF6B6B' },
    { name: '几何', color: '#4ECDC4' },
    { name: '代数', color: '#45B7D1' },
    { name: '概率统计', color: '#96CEB4' },
    { name: '集合', color: '#FFBE0B' }
  ];

  const relationships = [
    { 
      name: '前置条件', 
      type: 'Prerequisite',
      color: '#2D3748',
      lineStyle: 'solid',
      arrow: true
    },
    { 
      name: '包含关系', 
      type: 'Includes',
      color: '#4A5568',
      lineStyle: 'dashed',
      arrow: true
    },
    { 
      name: '相关联系', 
      type: 'RelatedTo',
      color: '#718096',
      lineStyle: 'dotted',
      arrow: false
    },
    { 
      name: '应用关系', 
      type: 'AppliedIn',
      color: '#A0AEC0',
      lineStyle: 'solid',
      arrow: true
    },
    { 
      name: '深入发展', 
      type: 'AdvancesTo',
      color: '#CBD5E0',
      lineStyle: 'solid',
      arrow: true
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4 sticky bottom-0">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2">知识点类别</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <div key={category.name} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">关系类型</h3>
          <div className="grid grid-cols-1 gap-2">
            {relationships.map(rel => (
              <div key={rel.name} className="flex items-center">
                <div className="w-12 flex items-center mr-2">
                  <div
                    className={`w-8 h-0.5 ${
                      rel.lineStyle === 'dashed' ? 'border-t-2 border-dashed' :
                      rel.lineStyle === 'dotted' ? 'border-t-2 border-dotted' :
                      ''
                    }`}
                    style={{ backgroundColor: rel.color }}
                  />
                  {rel.arrow && (
                    <div
                      className="w-0 h-0 border-t-4 border-b-4 border-l-4"
                      style={{
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderLeftColor: rel.color
                      }}
                    />
                  )}
                </div>
                <span className="text-sm">{rel.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend; 