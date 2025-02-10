import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LearningState {
  currentTopic: string | null;
  progress: Record<string, number>;
}

const initialState: LearningState = {
  currentTopic: null,
  progress: {},
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setCurrentTopic: (state: LearningState, action: PayloadAction<string>) => {
      state.currentTopic = action.payload;
    },
    updateProgress: (
      state: LearningState,
      action: PayloadAction<{ topicId: string; progress: number }>
    ) => {
      state.progress[action.payload.topicId] = action.payload.progress;
    },
  },
});

export const { setCurrentTopic, updateProgress } = learningSlice.actions;
export default learningSlice.reducer; 