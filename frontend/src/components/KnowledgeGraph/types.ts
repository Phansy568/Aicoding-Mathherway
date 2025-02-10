export interface KnowledgeNode {
  id: string;
  label: string;
  category: string;
  description: string;
  level: string;
  difficulty: number;
  prerequisites: string[];
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