import { useState, useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import { Movie } from "../interfaces/Movie";

import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && Array.isArray(data.results)) {
      setMovies(data.results);
    }
  };

  useEffect(() => {
    const searchWithQueryURL: string = `${searchURL}?query=${query}&${apiKey}`;

    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSlideLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft -= ref.current.offsetWidth;
    }
  };

  const handleSlideRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollLeft += ref.current.offsetWidth;
    }
  };

  return (
    <section className="container">
      <h2 className="title">
        Results for: <span className="query-text">{query}</span>
      </h2>
      <div className="movie_section">
        <button
          className="carousel-button carousel-button-left"
          onClick={() => handleSlideLeft(searchContainerRef)}
        >
          &lt;
        </button>
        <div className="movies_container" ref={searchContainerRef}>
          <div className="gallery_wrapper">
            {movies.length === 0 && <p>Loading...</p>}
            {movies.length > 0 &&
              movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} showLink />
              ))}
          </div>
        </div>
        <button
          className="carousel-button carousel-button-right"
          onClick={() => handleSlideRight(searchContainerRef)}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Search;
