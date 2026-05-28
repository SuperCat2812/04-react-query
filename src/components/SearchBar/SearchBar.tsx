import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";
interface SearchBarProps {
  onSubmit: (query: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const checkForm = (Form = new FormData()) => {
    const query = Form.get("query") as string;
    const movie = query.trim();
    if (query.length > 0) {
      onSubmit(movie);
    } else {
      toast.error("Please enter your search query.");
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer">
          Powered by TMDB
        </a>

        <form
          className={styles.form}
          action={checkForm}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button
            className={styles.button}
            type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
