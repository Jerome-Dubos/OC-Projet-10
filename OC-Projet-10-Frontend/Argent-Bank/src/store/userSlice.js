import { createSlice } from '@reduxjs/toolkit';

const loadStoredUser = () => {
  const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return user && token ? { isAuthenticated: true, user } : { isAuthenticated: false, user: null };
};

const initialState = {
  isAuthenticated: loadStoredUser().isAuthenticated,
  user: loadStoredUser().user,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;

      if (action.payload.rememberMe) {
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('token', action.payload.token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        sessionStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
    },
    setUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(state.user));
      } else if (sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadUserFromStorage: (state) => {
      const storedData = loadStoredUser();
      state.isAuthenticated = storedData.isAuthenticated;
      state.user = storedData.user;
    },
  },
});

export const { login, logout, setUserProfile, setStatus, setError, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;