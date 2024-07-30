import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [userId, setUserId] = useState('user123');
  const [userCoins, setUserCoins] = useState(0);

  const saveUserData = async (userId, coins) => {
    try {
      const response = await fetch(`/api/coins?userId=${userId}&coins=${coins}`, {
        method: 'POST',
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const getUserData = async (userId) => {
    try {
      const response = await fetch(`/api/coins?userId=${userId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setUserCoins(data.coins);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  const handleButtonClick = () => {
    const newCoins = userCoins + 10;
    setUserCoins(newCoins);
    saveUserData(userId, newCoins);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>User ID: {userId}</p>
        <p>User Coins: {userCoins}</p>
        <button onClick={handleButtonClick}>Add 10 Coins</button>
      </header>
    </div>
  );
}

export default App;
