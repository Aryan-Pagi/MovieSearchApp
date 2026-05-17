import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../Components/SearchBar";
import MovieCards from "../Components/MovieCards";

const HomePage = () => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "a62c88d9";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman");
  const timerRef = useRef(null);

  const fetchMovies = async (term = "Batman") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(term)}`,
      );
      const data = await response.json();
      if (data.Response === "False") {
        setError(data.Error);
        setMovies([]);
        return;
      }
      setMovies(data.Search || []);
    } catch (e) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 1000);
    return () => clearTimeout(timerRef.current);
  }, [searchTerm]);

  const handleSearch = () => {
    clearTimeout(timerRef.current);
    fetchMovies(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Discover Movies
        </h2>
        <p className="text-white/80 mt-2">
          Search the OMDB database and save your favorites
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onChange={setSearchTerm}
        onSearch={handleSearch}
        onKeyDown={handleKeyDown}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        {loading ? (
          <div className="col-span-full text-center text-yellow-300">
            Loading......
          </div>
        ) : (
          movies.map((movie) => <MovieCards key={movie.imdbID} {...movie} />)
        )}
        {error && <h3 className="col-span-full text-red-400">{error}</h3>}
        {!loading && movies.length === 0 && !error && (
          <h2 className="col-span-full text-2xl text-white/80">
            No movies found.
          </h2>
        )}
      </div>
    </section>
  );
};

export default HomePage;
