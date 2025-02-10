export interface KnowledgeNode {
  id: string;
  label: string;
  category: string;
  description: string;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface GraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  learningPath: LearningPathItem[];
  preferences: UserPreferences;
}

export interface LearningPathItem {
  topicId: string;
  progress: number;
  completedExercises: string[];
  masteryLevel: number;
}

export interface UserPreferences {
  learningStyle: string;
  difficultyLevel: string;
} 