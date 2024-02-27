import axios from 'axios';
import './get.css'; // Importing CSS styles
import { useState, useEffect } from 'react';

function BookSearch() {
  // State variables for storing books data, filtered books, search query
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from the API when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/books`
      );
      // Set both books and filteredBooks state to fetched data
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetching data fails
    }
  };

  // Function to handle search
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery); // Update searchQuery state
    // Filter books based on searchQuery and update filteredBooks state
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      {/* <Navbar onSearch={handleSearch} /> */}
       {/* Render Navbar component with handleSearch function passed as prop */}
      <div className="content">
        {/* Map through filteredBooks and render each book */}
        {filteredBooks.map((book, index) => (
          <div key={index} className="container">
            <h4>{book.title}</h4>
            
            <div className='author'>{book.author}</div>
            <div className='price'>{book.price}</div>
            <div className='publisher'>{book.publisher}</div>
            <div className='publication_date'>{book.publication_date}</div>
            <div className='genre'>{book.genre}</div>
            <div className='description'>{book.description}</div>
            <div className='number_of_pages'>{book.number_of_pages}</div>
            <div className='average_rating'>{book.average_rating}</div>
            {/* Additional fields from the schema */}
            <div className='ISBN'>{book.ISBN}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
