import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import logo from '../../img/argentBankLogo.webp';
import './NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);



  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };
console.log(user);

  const displayName = user?.userName || 'User';

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {localStorage.getItem('token') ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              {displayName}
            </Link>
            <button className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Log Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/signIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;