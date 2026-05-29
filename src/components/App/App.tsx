import "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "../ReactPaginate/ReactPaginate";

function App() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const movieQuery = useQuery({
    queryKey: ["movies", { query, page }],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const movies = movieQuery.data?.results || [];
  const totalPage = movieQuery.data?.total_pages || 1;
  const { isError, isLoading } = movieQuery;

  useEffect(() => {
    async function fetchMovie() {
      if (query && movieQuery.data && movies.length === 0) {
        toast.error("No movies found for your request.");
      }
    }
    fetchMovie();
  }, [movieQuery.data, movies, query]);

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
      {query && totalPage > 1 && (
        <ReactPaginate
          totalPages={totalPage}
          page={page}
          setPage={pageSet}
        />
      )}
      {movies.length>0&&isLoading ? (
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
    </>
  );
}

export default App;
