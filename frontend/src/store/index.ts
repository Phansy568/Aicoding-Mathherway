import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import learningReducer from './slices/learningSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    learning: learningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 