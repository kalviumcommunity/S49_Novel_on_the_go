import React from 'react';
import backgroundImage from './books.jpg'; 
import './App.css'; 

const WelcomeComponent = () => {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  return (
    <div className="main">
    <div className='container' style={containerStyle}>
      <h1>Welcome to Novels To Go</h1>
      <p>Discover a world of stories at your fingertips</p>
    </div>
    </div>
  );
};

export default WelcomeComponent;
