import { useState, useEffect, useRef } from "react";

import { Movie } from "../interfaces/Movie";

import MovieCard from "../components/MovieCard";

const moviesURL: string = import.meta.env.VITE_API;
const apiKey: string = import.meta.env.VITE_API_KEY;

import  "./MovieGrid.css";


const Home = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);

  const getMovies = async (topRatedUrl: string, popularUrl: string, nowPlayingUrl: string) => {
    const topRatedRes = await fetch(topRatedUrl);
    const topRatedData = await topRatedRes.json();
    setTopMovies(topRatedData.results);
  
    const popularRes = await fetch(popularUrl);
    const popularData = await popularRes.json();
    setPopularMovies(popularData.results);
  
    const nowPlayingRes = await fetch(nowPlayingUrl);
    const nowPlayingData = await nowPlayingRes.json();
    setNowPlayingMovies(nowPlayingData.results);
  };

  useEffect(() => {
    const topRatedUrl: string = `${moviesURL}top_rated?${apiKey}`;
    const popularUrl: string = `${moviesURL}popular?${apiKey}`;
    const nowPlayingUrl: string = `${moviesURL}now_playing?${apiKey}`;

    getMovies(topRatedUrl, popularUrl, nowPlayingUrl); 
  }, []);

  const topMoviesContainerRef = useRef<HTMLDivElement>(null);
  const popularMoviesContainerRef = useRef<HTMLDivElement>(null);
  const nowPlayingMoviesContainerRef = useRef<HTMLDivElement>(null);

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
    <main className="container">
      <section>
        <h2 className="title">Best Movies:</h2>
        <div className="movie_section">
          <button className="carousel-button carousel-button-left" onClick={() => handleSlideLeft(topMoviesContainerRef)}>
            &lt;
          </button>
          <div className="movies_container" ref={topMoviesContainerRef}>
            <div className="gallery_wrapper">
              {topMovies.length === 0 && <p>Loading...</p>}
              {topMovies.length > 0 &&
                topMovies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} showLink />)
              }
            </div>
          </div>
          <button className="carousel-button carousel-button-right" onClick={() => handleSlideRight(topMoviesContainerRef)}>
            &gt;
          </button>
        </div>
      </section>
      <section>
        <h2 className="title">Popular Movies:</h2>
        <div className="movie_section">
          <button className="carousel-button carousel-button-left" onClick={() => handleSlideLeft(popularMoviesContainerRef)}>
            &lt;
          </button>
          <div className="movies_container" ref={popularMoviesContainerRef}>
            <div className="gallery_wrapper">
              {popularMovies.length === 0 && <p>Loading...</p>}
              {popularMovies.length > 0 &&
                popularMovies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} showLink />)
              }
            </div>
          </div>
          <button className="carousel-button carousel-button-right" onClick={() => handleSlideRight(popularMoviesContainerRef)}>
            &gt;
          </button>
        </div>
      </section>
      <section>
        <h2 className="title">Now Playing Movies:</h2>
        <div className="movie_section">
          <button className="carousel-button carousel-button-left" onClick={() => handleSlideLeft(nowPlayingMoviesContainerRef)}>
            &lt;
          </button>
          <div className="movies_container" ref={nowPlayingMoviesContainerRef}>
            <div className="gallery_wrapper">
              {nowPlayingMovies.length === 0 && <p>Loading...</p>}
              {nowPlayingMovies.length > 0 &&
                nowPlayingMovies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} showLink />)
              }
            </div>
          </div>
          <button className="carousel-button carousel-button-right" onClick={() => handleSlideRight(nowPlayingMoviesContainerRef)}>
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;