import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './result.css'

function Resultbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = () => {
    axios.get('http://localhost:3000/createbooks')
      .then(result => {
        setBooks(result.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`http://localhost:3000/deletebooks/`+ id)
    .then(res => {console.log(res)
      window.location.reload()})
    .catch(errr => console.log(errr))
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (books.length === 0) return <div>No Books found.</div>;

  return (
    <div>
      <Link to="/" className='site-title'>
          Home
        </Link>
      {books.map(book => (
        <div className="card" key={book._id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Average Rating: {book.average_rating}</p>
          <div className="buttons">
            <button><Link to={`/update/${book._id}`}>Edit</Link></button>
            <button onClick={(e) => handleDelete(book._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Resultbooks;
