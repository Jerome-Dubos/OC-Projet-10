import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Error from './components/Error/Error';
import Home from './pages/Home/Home';
import SignIn from './pages/Sign-In/Sign-In';
import User from './pages/User/User';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'signIn', element: <SignIn /> },
      { path: 'user', element: <User /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
