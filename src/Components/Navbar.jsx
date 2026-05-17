import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavouritesContext } from "../context/FavouritesContext";

const Navbar = () => {
  const {favourites}=useContext(FavouritesContext);

  return (
    <nav className="w-full px-6 py-4 bg-linear-to-r from-indigo-700 via-purple-600 to-pink-500 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            🎬
          </div>
          <div>
            <div className="text-lg font-semibold">Movies Search App</div>
            <div className="text-sm text-white/80">
              Find and save your favorites
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:underline text-white/95">
            Home
          </Link>
          <Link to="/favourites" className="relative">
            <span className="hover:underline text-white/95">Favourites</span>
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-white text-indigo-700 absolute">
              {favourites.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
