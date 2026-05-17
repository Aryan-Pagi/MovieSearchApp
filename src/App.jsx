import React from "react";
import "./App.css";
import Favourites from "./Pages/Favourites";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-linear-to-b from-gray-900 via-gray-900 to-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
