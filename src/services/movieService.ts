import axios from "axios";
import type { Movie } from "../types/movie";
const token = import.meta.env.VITE_API_KEY;

axios.defaults.baseURL = "https://api.themoviedb.org/3/search";
interface fetchMoviesProps {
  page: number;
  query: string;
}

interface AxiosParams {
  params: { page: number; query: string };
  headers: {
    Authorization: string;
  };
}

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async ({
  query,
  page,
}: fetchMoviesProps): Promise<MoviesResponse> => {
  const option: AxiosParams = {
    params: {
      page,
      query,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<MoviesResponse>("/movie", option);
  return data;
};
