import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import './Sign-In.css';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setErrorMessage] = useState(null);



  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      navigate('/user');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect username or password');
      }

      const data = await response.json();

      const token = data.body?.token;
      if (!token) {
        throw new Error('Token missing in response');
      }

      localStorage.setItem('token', token);

      const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Unable to fetch user profile');
      }

      const profileData = await profileResponse.json();

      const userProfile = {
        ...profileData.body,
        username: profileData.body.userName || profileData.body.username || 'User'
      };


      dispatch(login(userProfile));
      navigate('/user');
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
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
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password || ""}
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