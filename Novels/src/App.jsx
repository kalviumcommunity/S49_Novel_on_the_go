// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/welcome';
import BookSearch from './components/get';
import AddBookForm from './components/addbooks';
import SignUpLogin from './components/Login';
import Resultbooks from './components/resultbooks';
import Update from './components/edit';
import Logout from './components/logout';
import Users from './components/users';
import BooksByUser from './components/books';

function App() {
  return (
    <div>
      <Logout />
      <Users/>
      
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/addbooks" element={<AddBookForm />} />
        <Route path="/resultbooks" element={<Resultbooks />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/books/:username" element={< BooksByUser/>} />
        


      </Routes>
    </div>
  );
}

export default App;
