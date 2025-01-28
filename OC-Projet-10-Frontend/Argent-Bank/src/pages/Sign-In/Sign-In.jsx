import React from 'react';
import './Sign-In.css'

const SignIn = () => {
  return (
    <>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* Lien placeholder pour l'instant */}
            <a href="./user.html" className="sign-in-button">Sign In</a>
            {/* Décommentez le bouton ci-dessous pour une fonctionnalité réelle */}
            {/* <button className="sign-in-button">Se connecter</button> */}
          </form>
        </section>
      </main>

    </>
  );
};

export default SignIn;
