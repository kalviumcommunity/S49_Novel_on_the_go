import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import './get.css';

function BookSearch() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    // Filter books based on searchQuery and exclude the first 10 books
    const filtered = books
      .slice(10) // Exclude the first 10 books
      .filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        // Add more fields from the schema for search if needed
      );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="content">
        {filteredBooks.map((book, index) => (
          <div key={index} className="container">
            <h4>{book.title}</h4>
            <div className="author">{book.author}</div>
            <div className="price">{book.price}</div>
            <div className="publisher">{book.publisher}</div>
            <div className="publication_date">{book.publication_date}</div>
            <div className="genre">{book.genre}</div>
            <div className="description">{book.description}</div>
            <div className="number_of_pages">{book.number_of_pages}</div>
            <div className="average_rating">{book.average_rating}</div>
            <div className="ISBN">{book.ISBN}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
