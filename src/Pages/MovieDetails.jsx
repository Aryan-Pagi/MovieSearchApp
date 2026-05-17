import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "a62c88d9";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
        );
        const data = await res.json();
        if (!mounted) return;
        if (data.Response === "False") {
          setError(data.Error || "Not found");
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch (e) {
        setError("Failed to load movie details.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDetails();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!movie) return null;

  return (
    <section className="max-w-5xl mx-auto text-white">
      <div className="mb-6">
        <Link to="/" className="text-indigo-300 hover:underline">
          ← Back to search
        </Link>
      </div>

      <div className="bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg p-6 md:flex gap-6">
        <div className="md:w-1/3">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-auto rounded-lg object-cover shadow-inner"
          />
        </div>

        <div className="md:flex-1 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold">
            {movie.Title}{" "}
            <span className="text-sm text-white/70">({movie.Year})</span>
          </h1>
          <p className="text-white/80 mt-2">
            {movie.Genre} • {movie.Runtime} • {movie.Rated}
          </p>

          <p className="mt-4 text-white/90">{movie.Plot}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
            <div>
              <div className="font-semibold">Director</div>
              <div>{movie.Director}</div>
            </div>
            <div>
              <div className="font-semibold">Writer</div>
              <div>{movie.Writer}</div>
            </div>
            <div>
              <div className="font-semibold">Actors</div>
              <div>{movie.Actors}</div>
            </div>
            <div>
              <div className="font-semibold">Language</div>
              <div>{movie.Language}</div>
            </div>
          </div>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="mt-6">
              <div className="font-semibold">Ratings</div>
              <ul className="list-disc list-inside text-white/80">
                {movie.Ratings.map((r) => (
                  <li key={r.Source}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
