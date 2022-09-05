import Container from "./ui/Container";
import Loading from "./ui/Loading";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";
import styles from "./TopMoviesList.module.css";
import { getTopMovies } from "../api";

const TopMoviesList = () => {
  const { data, isLoading, error } = useQuery(["topMovies"], getTopMovies);

  return (
    <Container className={styles.bg}>
      <h1 className={styles.title}>Top 20 best movies!</h1>
      {isLoading && <Loading />}
      <ol className={styles.list}>
        {!isLoading &&
          data.results.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              vote={movie.vote_average}
            />
          ))}
      </ol>
      {error && <p>{error.message}</p>}
    </Container>
  );
};
export default TopMoviesList;
