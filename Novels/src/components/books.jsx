import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BooksByUser = () => {
  const [books, setBooks] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    const fetchBooksByUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/createbooks?username=${username}`);
        const booksAddedByUser = response.data.filter(book => book.userName === username);
        setBooks(booksAddedByUser);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooksByUser();
  }, [username]);

  return (
    <div>
      <h1 className="Books">Books added by {username}</h1>
      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Average Rating: {book.average_rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksByUser;
