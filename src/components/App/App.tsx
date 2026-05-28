import "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { type Movie } from "../../types/movie";
import { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginates from "../ReactPaginate/ReactPaginate";

function App() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const movieQuery = useQuery({
    queryKey: ["movie", { query, page }],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== "",
  });
  const movies = movieQuery.data?.results || [];
  const totalPage = movieQuery.data?.total_pages || 1;
  const { isError, isLoading } = movieQuery;

  const onSubmit = (query: string) => {
    setQuery(query);
    setPage(1);
  };
  const onSelect = (movieSelect: Movie) => {
    setMovie(movieSelect);
  };
  const onclose = () => {
    setMovie(null);
  };
  const pageSet = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid
          onSelect={onSelect}
          movies={movies}
        />
      )}
      {isError && <ErrorMessage />}
      {movie && (
        <MovieModal
          movie={movie}
          onClose={onclose}
        />
      )}
      {query && totalPage > 1 && (
        <ReactPaginates
          totalPages={totalPage}
          page={page}
          setPage={pageSet}
        />
      )}
    </>
  );
}

export default App;
