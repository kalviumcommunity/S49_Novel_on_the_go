import React from 'react';
import WelcomeComponent from './welcome';
import BookSearch from "./get.jsx";
import { Route, Routes } from "react-router-dom";
// import EntityComponent from './data';

function App() {
  return (
    <div>
      <WelcomeComponent />
      <Routes>
          <Route path="/first" element={<BookSearch />} />
        </Routes>

      {/* <EntityComponent /> */}
    </div>
  );
}

export default App;
