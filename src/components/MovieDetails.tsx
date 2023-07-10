import styles from "./MovieDetails.module.css";

import { FaStar } from "react-icons/fa";

import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

const imageUrl = import.meta.env.VITE_IMG;

import { Movie } from "../interfaces/Movie";

interface Props {
  movie: Movie;
  formatCurrency: Function;
}

const MovieCard = ({ movie, formatCurrency }: Props) => {
  return (
    <div className={styles.movie_card}>
      {movie && (
        <>
          <div className={styles.movieMain_details}>
            <h1>{movie.title}</h1>
            <div className={styles.secondMain_details}>
              <img src={imageUrl + movie.poster_path} alt={movie.title} />
              <div className={styles.secondMain_title_details}>
                <p className={styles.tagline}>{movie.tagline}</p>
                <p>
                  <FaStar /> {movie.vote_average}
                </p>
                {movie.budget && (
                  <div className={styles.info}>
                    <h3>
                      <BsWallet2 /> Budget:
                    </h3>
                    <p>{formatCurrency(movie.budget)}</p>
                  </div>
                )}
                {movie.revenue && (
                  <div className={styles.info}>
                    <h3>
                      <BsGraphUp /> Invoicing:
                    </h3>
                    <p>{formatCurrency(movie.revenue)}</p>
                  </div>
                )}
                <div className={styles.info}>
                  <h3>
                    <BsHourglassSplit /> Duration:
                  </h3>
                  <p>{movie.runtime} minutes</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.MovieDetails_description}>
            <h3>
              <BsFillFileEarmarkTextFill /> Details:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
