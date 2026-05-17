import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

const MovieCards = ({ Poster, Title, Year, imdbID }) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavourite = favourites.some((f) => f.imdbID === imdbID);

  return (
    <div className="m-4 w-64 bg-linear-to-b from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-200">
      <div className="w-full h-80 bg-gray-700 relative">
        <img
          src={
            Poster !== "N/A"
              ? Poster
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-black/40 text-xs text-white px-2 py-1 rounded">
          {Year}
        </div>
      </div>

      <div className="p-4 bg-linear-to-t from-black/40">
        <h3 className="text-lg font-semibold truncate" title={Title}>
          {Title}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleFavourite({ Poster, Title, Year, imdbID })}
            aria-label={isFavourite ? "Remove favourite" : "Add to favourites"}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${isFavourite ? "bg-red-500" : "bg-white/10 hover:bg-white/20"}`}
          >
            <span className="text-lg">{isFavourite ? "❤️" : "🤍"}</span>
            <span className="text-sm text-white/90">
              {isFavourite ? "Saved" : "Save"}
            </span>
          </button>

          <button
            type="button"
            aria-label={`View details for ${Title}`}
            onClick={() => navigate(`/movie/${imdbID}`)}
            className="px-3 py-1 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
