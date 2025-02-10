import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphData, KnowledgeNode, KnowledgeEdge } from '../../components/KnowledgeGraph/types';
import { knowledgeGraphData } from '../../data/knowledgeGraphData';

const initialState: GraphData = knowledgeGraphData;

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<KnowledgeNode>) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<KnowledgeEdge>) => {
      state.edges.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<{ id: string; updates: Partial<KnowledgeNode> }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        Object.assign(node, action.payload.updates);
      }
    }
  }
});

export const { addNode, addEdge, updateNode } = graphSlice.actions;
export default graphSlice.reducer; 