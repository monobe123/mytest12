import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import tictactoeImage from './images/tictactoe.png';
import power4Image from './images/power4.png';
import memoryGameImage from './images/memorygame.png';
import triviaQuizImage from './images/triviaquiz.jpg';

const Home = () => {
  const [userEmail, setUserEmail] = useState('');
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserEmail(user.email);
          // Fetch and set history from localStorage on login
          const storedHistory = localStorage.getItem('gameHistory');
          setHistoryList(storedHistory ? JSON.parse(storedHistory) : []);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setHistoryList([]); // Clear history on sign-out
      localStorage.removeItem('gameHistory');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleButtonClick = (game) => {
    const updatedHistory = [...historyList, game];
    setHistoryList(updatedHistory);
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
    navigate(`/${game.toLowerCase().replace(/\s/g, '')}`);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'lightblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setShowUserInfo(!showUserInfo)}
        >
          <span role="img" aria-label="user" style={{ fontSize: '20px' }}>
            👤
          </span>
        </div>
        {showUserInfo && (
          <div style={{ marginTop: '10px' }}>
            <p style={{ color: 'black' }}>{userEmail}</p>
            <button onClick={() => setShowHistory(!showHistory)}>Show History</button>
            <Link to="/">
              <button onClick={handleSignOut}>Sign Out</button>
            </Link>
          </div>
        )}
        {showHistory && (
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ color: 'black' }}>History:</h3>
            <ul style={{ color: 'black' }}>
              {historyList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <h1>Welcome to game Arena</h1>
      <h3>You will find here a game you will like</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <article style={{ margin: '10px', color: 'black' }}>
          <h2>Tic Tac Toe</h2>
          <img src={tictactoeImage} alt="Tic Tac Toe" style={{ width: '200px', height: '150px' }} />
          <p>A classic game where two players take turns marking spaces in a 3x3 grid to get three in a row.</p>
          <button onClick={() => handleButtonClick('Tic Tac Toe')}>Play</button>
        </article>
        <article style={{ margin: '10px', color: 'black' }}>
          <h2>Power 4</h2>
          <img src={power4Image} alt="Power 4" style={{ width: '200px', height: '150px' }} />
          <p>Similar to Connect Four, players drop discs into a grid trying to form a line of four of their own color.</p>
          <button onClick={() => handleButtonClick('Power 4')}>Play</button>
        </article>
        <article style={{ margin: '10px', color: 'black' }}>
          <h2>Memory Game</h2>
          <img src={memoryGameImage} alt="Memory Game" style={{ width: '200px', height: '150px' }} />
          <p>A game to test memory by finding matching pairs of cards within a set of face-down cards.</p>
          <button onClick={() => handleButtonClick('Memory Game')}>Play</button>
        </article>
        <article style={{ margin: '10px', color: 'black' }}>
          <h2>Trivia Quiz</h2>
          <img src={triviaQuizImage} alt="Trivia Quiz" style={{ width: '200px', height: '150px' }} />
          <p>A quiz game to test your knowledge in various categories with multiple-choice questions.</p>
          <Link to="/triviaquiz">
            <button>Play</button>
          </Link>
        </article>
      </div>
    </div>
  );
};

export default Home;
