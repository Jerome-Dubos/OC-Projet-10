import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // On va créer ce slice dans l'étape suivante

export const store = configureStore({
  reducer: {
    user: userReducer, // Ajouter le reducer pour gérer l'état de l'utilisateur
  },
});

// Exporter le hook useDispatch et useSelector pour une utilisation dans les composants
export default store;
