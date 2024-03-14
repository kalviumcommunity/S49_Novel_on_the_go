import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UserDropdown = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  const handleUserChange = (event) => {
    const selectedUsername = event.target.value;
    setSelectedUser(selectedUsername);
    navigate(`/books/${selectedUsername}`); 
  };

  return (
    <div>
          <Link to="/" className='site-title'>
          Home
        </Link>
      <label htmlFor="userDropdown">Select User:</label>
      <select id="userDropdown" value={selectedUser} onChange={handleUserChange}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user.userName}>{user.userName}</option>
        ))}
      </select>
    </div>
  );
};

export default UserDropdown;