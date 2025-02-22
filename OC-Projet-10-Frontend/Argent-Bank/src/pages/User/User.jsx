import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPseudo } from '../../store/userSlice';
import Accounts from '../../components/Accounts/Accounts';
import './User.css';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || 'user');

  useEffect(() => {
    setUserName(user?.userName || 'user');
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userName,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Unable to update profile');
      }
  
      if (data.body) {
        const updatedUser = {
          ...user,
          userName: data.body.userName,
          username: data.body.userName,
        };

        dispatch(setPseudo(updatedUser.userName));
        setUserName(updatedUser.userName);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setUserName(user?.userName || 'user');
    setIsEditing(false);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="edit-input"
            />
          ) : (
            user.userName
          )}!
        </h1>
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSaveClick}>Save</button>
            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
        )}
      </div>
      <Accounts />
    </main>
  );
};

export default User;