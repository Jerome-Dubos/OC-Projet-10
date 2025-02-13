import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Parallax from 'parallax-js';
import './Error.css';
import Logo from '../../img/argentBankLogo-removebg.webp'

const Error = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const parallaxInstance = new Parallax(sceneRef.current);


      return () => {
        parallaxInstance.destroy();
      };
    }
  }, []);

  return (
    <div className="error-page">


      <section className="wrapper">
        <div className="container">
          <div ref={sceneRef} className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>
            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>
            <p className="p404" data-depth="0.50">404</p>
            <p className="p404" data-depth="0.10">404</p>
          </div>
          <div className="text">
            <article>
              <p>Oops, this page no longer exists or has been moved. <br />Please check the URL or return to the homepage to access our services.</p>
              <Link to="/">
                <button>Return to homepage</button>
              </Link>
            </article>
          </div>
          
          {/* Logo in background */}
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
