import React, { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <section className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Your Favourites
        </h2>
        <p className="text-white/80 mt-2">Movies you saved for later</p>
      </div>

      {favourites && favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {movie.Title}
                </h3>
                <p className="text-sm text-white/70 mt-1">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white/80">
          No favorite movies added yet.
        </div>
      )}
    </section>
  );
};

export default Favourites;
