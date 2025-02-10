import { GraphData } from '../components/KnowledgeGraph/types';

export const knowledgeGraphData: GraphData = {
  nodes: [
    // 基础概念
    {
      id: 'set',
      label: '集合',
      category: '基础',
      description: '集合的概念与运算',
      level: '必修',
      difficulty: 1,
      prerequisites: []
    },
    {
      id: 'logic',
      label: '逻辑',
      category: '基础',
      description: '常用逻辑用语',
      level: '必修',
      difficulty: 1,
      prerequisites: []
    },
    // 函数类
    {
      id: 'function',
      label: '函数',
      category: '函数',
      description: '函数的概念及表示',
      level: '必修',
      difficulty: 2,
      prerequisites: ['set']
    },
    {
      id: 'quadratic',
      label: '二次函数',
      category: '函数',
      description: '二次函数与方程',
      level: '必修',
      difficulty: 2,
      prerequisites: ['function']
    },
    {
      id: 'power',
      label: '幂函数',
      category: '函数',
      description: '幂函数的性质',
      level: '必修',
      difficulty: 2,
      prerequisites: ['function']
    },
    {
      id: 'exp-log',
      label: '指数对数函数',
      category: '函数',
      description: '指数函数与对数函数',
      level: '必修',
      difficulty: 3,
      prerequisites: ['function']
    },
    {
      id: 'trig',
      label: '三角函数',
      category: '函数',
      description: '三角函数的概念与性质',
      level: '必修',
      difficulty: 3,
      prerequisites: ['function']
    },
    // 几何类
    {
      id: 'vector',
      label: '向量',
      category: '几何',
      description: '平面向量与空间向量',
      level: '必修',
      difficulty: 3,
      prerequisites: []
    },
    {
      id: 'solid',
      label: '立体几何',
      category: '几何',
      description: '空间几何体的性质',
      level: '必修',
      difficulty: 3,
      prerequisites: ['vector']
    },
    {
      id: 'conic',
      label: '圆锥曲线',
      category: '几何',
      description: '椭圆、双曲线、抛物线',
      level: '选修',
      difficulty: 4,
      prerequisites: ['vector']
    },
    // 代数类
    {
      id: 'complex',
      label: '复数',
      category: '代数',
      description: '复数的概念与运算',
      level: '必修',
      difficulty: 3,
      prerequisites: ['quadratic']
    },
    {
      id: 'sequence',
      label: '数列',
      category: '代数',
      description: '等差数列与等比数列',
      level: '选修',
      difficulty: 3,
      prerequisites: ['function']
    },
    // 概率统计类
    {
      id: 'probability',
      label: '概率论',
      category: '概率统计',
      description: '随机事件与概率',
      level: '必修',
      difficulty: 3,
      prerequisites: ['set']
    },
    {
      id: 'statistics',
      label: '统计',
      category: '概率统计',
      description: '统计分析方法',
      level: '必修',
      difficulty: 3,
      prerequisites: ['probability']
    }
  ],
  edges: [
    // 前置关系
    { source: 'set', target: 'function', relationship: 'Prerequisite' },
    { source: 'function', target: 'quadratic', relationship: 'Prerequisite' },
    { source: 'function', target: 'power', relationship: 'Prerequisite' },
    { source: 'function', target: 'exp-log', relationship: 'Prerequisite' },
    { source: 'function', target: 'trig', relationship: 'Prerequisite' },
    { source: 'vector', target: 'solid', relationship: 'Prerequisite' },
    { source: 'vector', target: 'conic', relationship: 'Prerequisite' },
    { source: 'quadratic', target: 'complex', relationship: 'Prerequisite' },
    { source: 'function', target: 'sequence', relationship: 'Prerequisite' },
    { source: 'set', target: 'probability', relationship: 'Prerequisite' },
    { source: 'probability', target: 'statistics', relationship: 'Prerequisite' },
    
    // 包含关系
    { source: 'function', target: 'quadratic', relationship: 'Includes' },
    { source: 'function', target: 'power', relationship: 'Includes' },
    { source: 'function', target: 'exp-log', relationship: 'Includes' },
    { source: 'function', target: 'trig', relationship: 'Includes' },
    
    // 相关关系
    { source: 'logic', target: 'set', relationship: 'RelatedTo' },
    { source: 'probability', target: 'statistics', relationship: 'RelatedTo' },
    { source: 'vector', target: 'conic', relationship: 'RelatedTo' },
    
    // 应用关系
    { source: 'vector', target: 'solid', relationship: 'AppliedIn' },
    { source: 'function', target: 'statistics', relationship: 'AppliedIn' },
    
    // 深入发展关系
    { source: 'quadratic', target: 'complex', relationship: 'AdvancesTo' },
    { source: 'vector', target: 'conic', relationship: 'AdvancesTo' }
  ]
}; 