import React from 'react';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <NavBar />
        <Outlet />
      <Footer />
    </>
  );
}
