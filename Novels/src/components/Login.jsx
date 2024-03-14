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
    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:3000/login', { email, password });
      } else {
        response = await axios.post('http://localhost:3000/signup', { userName, email, password });
      }
      setMessage(response.data.message);
      Cookies.set('userName', response.data.userName);
      Cookies.set('token', response.data.accessToken);
      localStorage.setItem("username", response.data.userName);
      localStorage.setItem('token', response.data.accessToken);
      // Redirect or perform necessary actions after successful login/signup
      setTimeout(() => {
        window.location.href = '/'; // Simple redirect
      }, 2000);
    } catch (error) {
      console.error('Error:', error.response.data);
      setMessage(error.response.data.error);
    }
  };

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

