import React from 'react';


const Data = {
  "_id": {
    "$oid": "65d3049243527c25241d6c19"
  },
  "Title": "The Great Gatsby",
  "description": '"The Great Gatsby" by F. Scott Fitzgerald is a timeless American classic set in the Roaring Twenties. Jay Gatsby, a mysterious millionaire, pursues the elusive Daisy Buchanan in a tale of love, wealth, and the American Dream. The novel explores the decadence and disillusionment of the Jazz Age with poetic brilliance.',
  "Author": "F. Scott Fitzgerald",
  "ISBN": "9780743273565",
  "Date": "April 10, 1925",
  "Genre": "Classic Literature",
  "Pages": "180",
  "price": "$9.99",
  "Rating": "4.1"
};

const EntityComponent = () => {
  return (
    <div>
      <h2>{Data.Title}</h2>
      <div className="entity-table">
        <div>
          <strong>Description:</strong> {Data.description}
        </div>
        <div>
          <strong>Author:</strong> ${Data.Author}
        </div>
         <div>
          <strong>ISBN Number:</strong> ${Data.ISBN}
        </div>
         <div>
          <strong>Date:</strong> ${Data.Date}
        </div>
        <div>
          <strong>Genre:</strong> ${Data.Genre}
        </div>
        <div>
          <strong>Number of Pages:</strong> ${Data.Pages}
        </div>
        <div>
          <strong>Price:</strong> ${Data.price}
        </div>
        <div>
          <strong>Average Rating:</strong> {Data.Rating}
        </div>
      </div>
    </div>
  );
};

export default EntityComponent;
