import { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favourites")) || [];
    } catch {
      return [];
    }
  });

  const toggleFavourite = (movie) => {
    setFavourites((prev) => {
      const exists = prev.some((f) => f.imdbID === movie.imdbID);
      return exists
        ? prev.filter((f) => f.imdbID !== movie.imdbID)
        : [...prev, movie];
    });
  };

   useEffect(() => {
     localStorage.setItem("favourites", JSON.stringify(favourites));
   }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
