import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Movie as MovieInterface } from "../interfaces/Movie";

import MovieDetails from "../components/MovieDetails";

import styles from "./Movie.module.css";

const moviesURL: string = import.meta.env.VITE_API;
const apiKey: string = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieInterface>();

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  }

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`
    getMovie(movieURL);
  }, [])

  return (
    <div className={styles.moviePage}>
      {movie && (
        <>
          <div>
            <MovieDetails movie={movie} formatCurrency={formatCurrency} />
          </div>
        </>
      )}
    </div>
  )
}

export default Movie;