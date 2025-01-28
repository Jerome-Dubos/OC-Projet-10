import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/userSlice';
import './User.css';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  // Synchroniser localement les changements de Redux avec les inputs
  useEffect(() => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
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
          firstName,
          lastName,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to update profile');
      }

      const data = await response.json();
      dispatch(setUserProfile(data.body));
      setIsEditing(false); // Fermer l'édition
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
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
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="edit-input"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="edit-input"
              />
            </>
          ) : (
            `${user.firstName} ${user.lastName}`
          )}
        !
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
