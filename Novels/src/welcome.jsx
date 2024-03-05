// WelcomeComponent.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

const WelcomeComponent = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Fetch the first 10 books from your backend API
    fetch(`http://localhost:3000/books`)
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Log the received data to the console
        setBooks(data.slice(0, 10));
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div className="main">
      <h1>Welcome to the Bookstore!</h1>
      <Link to="/search" className="site-title">
        Let's Begin
      </Link>
      <Link to="/addbooks" className="site-title1">
        Add books
      </Link>
      <Link to="/login" className="site-title1">
        Login
      </Link>
      <div>
        {location.pathname === "/" && (
          <div>
            <h2>Top 10 Books</h2>
            <div className='content'>
              {books.map(book => (
                <div key={book._id} className="container">
                  <h3>{book.title}</h3>
                  <div className='author'>Author: {book.author}</div>
                  <div className='price'>Price: {book.price}</div>
                  <div className='publication_date'>Date: {book.publication_date}</div>
                  <div className='genre'>Genre: {book.genre}</div>
                  <div className='description'>Description: {book.description}</div>
                  <div className='number_of_pages'>Pages: {book.number_of_pages}</div>
                  <div className='average_rating'>Rating: {book.average_rating}/5</div>

                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeComponent;
