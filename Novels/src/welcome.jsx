import React from 'react';
import './App.css'; 
import { Link } from "react-router-dom";

const WelcomeComponent = () => {
 
  return (
    <div className="main">
 
 
     <Link to="/first" className="site-title">
          Let's Begin
        </Link>
 
    </div>
    
  );
};

export default WelcomeComponent;
