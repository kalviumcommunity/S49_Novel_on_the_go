import React, { useState } from "react";
import { Link } from "react-router-dom";
import './nav.css'

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearchQuery = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="main1">
      <nav className="nav">
        {/* Link to navigate to the main page. onClick event to clear the search query */}
        <Link to="/" onClick={clearSearchQuery} className="site-title">
          Home
        </Link>

        {/* Search form */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="search"
            className="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          <button className="btn" type="submit">Search</button>
        </form>
      </nav>
    </div>
  );
}
