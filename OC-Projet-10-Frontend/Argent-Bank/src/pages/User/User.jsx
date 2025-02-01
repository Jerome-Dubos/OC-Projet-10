import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/userSlice';
import './User.css';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || '');

  useEffect(() => {
    setUserName(user?.userName || '');
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
          'Authorization': `Bearer ${user.token}`,
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
  
        dispatch(setUserProfile(updatedUser));
        setUserName(updatedUser.userName);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setUserName(user?.userName || '');
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
      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;