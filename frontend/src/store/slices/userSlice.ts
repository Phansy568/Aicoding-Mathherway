import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  email: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    logout: (state) => {
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer; 