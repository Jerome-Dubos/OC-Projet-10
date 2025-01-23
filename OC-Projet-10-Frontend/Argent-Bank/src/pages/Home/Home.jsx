import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import Footer from '../../components/Footer/Footer';
import './Home.css'

const Home = () => (
  <>
    <NavBar />
    <main>
      <Hero />
      <Features />
    </main>
    <Footer />
  </>
);

export default Home;