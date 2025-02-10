export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const KNOWLEDGE_CATEGORIES = {
  FUNCTION: '函数',
  GEOMETRY: '几何',
  ALGEBRA: '代数',
  STATISTICS: '概率统计'
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: '简单',
  MEDIUM: '中等',
  HARD: '困难'
} as const; 