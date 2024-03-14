import React from 'react';
import Cookies from 'js-cookie';
import '../App.css'

const Logout = () => {
  const handleLogout = () => {
    Cookies.remove('userName');
    Cookies.remove('token');
    localStorage.clear();

    window.location.reload();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
