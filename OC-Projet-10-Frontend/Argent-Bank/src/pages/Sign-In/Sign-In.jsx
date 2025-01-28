import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, setUserProfile, setStatus, setError } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import './Sign-In.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Incorrect username or password');
      }

      const data = await response.json();
      const user = {
        id: data.body?.id || null,
        email: data.body?.email || null,
        firstName: data.body?.firstName || null,
        lastName: data.body?.lastName || null,
        token: data.body?.token,
      };

      dispatch(login(user));

      const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.body.token}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Unable to fetch user profile');
      }

      const profileData = await profileResponse.json();
      dispatch(setUserProfile(profileData.body));

      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.body.token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', data.body.token);
      }

      navigate('/user');
    } catch (error) {
      setErrorMessage(error.message);
      dispatch(setError(error.message));
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
