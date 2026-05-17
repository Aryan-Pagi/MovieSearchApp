import React, { useEffect, useState } from "react";
import "./App.css";
import Favourites from "./Pages/Favourites";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./Components/Navbar";

function App() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  const toggleFavourite = (movie) => {
    setFavourites((prev) => {
      const exists = prev.some((fav) => fav.imdbID === movie.imdbID);
      const next = exists
        ? prev.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...prev, movie];
      try {
        localStorage.setItem("favourites", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    console.log("Favourites:", favourites);
  }, [favourites]);

  return (
    <>
      <Navbar favouritesCount={favourites.length} />
      <main className="bg-linear-to-b from-gray-900 via-gray-900 to-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/favourites"
              element={<Favourites favourites={favourites} />}
            />
            <Route 
              path="/movie/:id"
              element={<MovieDetails />}
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
