import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Movie } from "../interfaces/Movie";

interface Props {
  movie: Movie;
  showLink: boolean;
}

const imageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.style.display = "none";
};

const MovieCard = ({ movie, showLink = true }: Props) => {
  const imageUrl = import.meta.env.VITE_IMG;
  const imageSrc = `${imageUrl}${movie.poster_path}`;
  const isValidImage = movie.poster_path !== null; // Verifica se o caminho da imagem é válido

  return (
    <div className={styles.movie_card}>
      {isValidImage ? (
        <img src={imageSrc} alt={movie.title} onError={(e) => imageError(e)} />
      ) : (
        <div className={styles.imgError}>
          <AiOutlineClose /> 
          <p>No image was found</p>
        </div>
      )}
      <div className={styles.movie_card_details}>
        <h2>{movie.title}</h2>
        <p>
          <FaStar /> {movie.vote_average}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Details</Link>}
      </div>
    </div>
  );
};

export default MovieCard;
