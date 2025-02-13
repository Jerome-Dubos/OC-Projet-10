import React, { useState, useEffect } from 'react';
import './Accounts.css'

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/data/Accounts.json');
        if (!response.ok) {
          throw new Error('Failed to fetch accounts data');
        }
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (isLoading) {
    return <div>Loading accounts...</div>;
  }

  if (error) {
    return <div>Error loading accounts: {error}</div>;
  }

  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <section key={account.id} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </>
  );
};

export default Accounts;