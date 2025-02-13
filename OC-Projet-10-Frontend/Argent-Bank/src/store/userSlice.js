import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  userName: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...action.payload };
    },
    logout: () => {
      return { ...initialState };
    },
    setPseudo: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { login, logout, setPseudo } = userSlice.actions;
export default userSlice.reducer