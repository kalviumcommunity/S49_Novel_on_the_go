// App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeComponent from './welcome';
import BookSearch from './get';
import AddBookForm from './addbooks';
import RegForm from './Login'
import Resultbooks from './resultbooks';
import Update from './edit'

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/addbooks" element={<AddBookForm />} />
        <Route path="/resultbooks" element={<Resultbooks />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/login" element={<RegForm />} />
      </Routes>
    </div>
  );
}

export default App;
