import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import logo from '../../img/argentBankLogo.webp';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Utiliser useNavigate pour la redirection
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');  // Rediriger vers la page d'accueil après le logout
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/"> 
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            {/* Lien vers la page utilisateur */}
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              User
            </Link>
            {/* Bouton Log Out avec redirection */}
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Log Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
