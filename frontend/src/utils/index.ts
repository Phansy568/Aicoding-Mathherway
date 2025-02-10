export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const calculateMasteryLevel = (progress: number): string => {
  if (progress >= 90) return '精通';
  if (progress >= 70) return '熟练';
  if (progress >= 50) return '理解';
  return '入门';
}; 