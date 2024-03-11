import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import Cookies from 'js-cookie';
export default function RegForm() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:3000/login', { userName, email, password });
        setMessage(response.data.message);
        Cookies.set('userName', response.data.userName);
        localStorage.setItem("username", response.data.username);
        console.log(response.data);
        localStorage.setItem('token', response.data.acesstoken);
        // Set token or do other necessary actions
      } else {
        const response = await axios.post('http://localhost:3000/signup', { userName, email, password });
        setMessage(response.data.message);
        Cookies.set('userName', response.data.userName);
        localStorage.setItem("username", response.data.username);
        console.log(response.data);
        localStorage.setItem('token', response.data.acesstoken);
        // Set token or do other necessary actions
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  if (isAuthenticated) {
    window.location.reload();
    return null;
  }

  return (
    <div className="container2">
      <div className="register">
        <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
        <form onSubmit={handleSubmit}>
         
            <input
              id="name"
              className="form1"
              type="text"
              placeholder="Name"
              name="name"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
        
          <input
            id="email"
            className="form1"
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            className="form1"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          {message && <p >{message}</p>}
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

