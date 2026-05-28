import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}
export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const select = () => {
          onSelect(movie);
        };
        return (
          <li
            key={movie.id}
            onClick={select}>
            <div className={css.card}>
              <img
                className={css.image}
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                alt={"movie title" + movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>Movie title {movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
