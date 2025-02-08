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
      return { ...action.payload }; // Retourner un nouvel objet pour mettre à jour l'état
    },
    logout: () => {
      return { ...initialState }; // Réinitialiser l'état au logout
    },
    setPseudo: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { login, logout, setPseudo } = userSlice.actions;
export default userSlice.reducer