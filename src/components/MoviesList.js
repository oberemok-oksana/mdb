import Container from "./ui/Container";
import Loading from "./ui/Loading";
import Movie from "./Movie";
import { useQuery } from "@tanstack/react-query";
import styles from "./MoviesList.module.css";

const getTopMovies = () => {
  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=091a850778d47440ea8d7d370d18ef7d&language=en-US&page=2"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

const MoviesList = () => {
  const { data, isLoading, error } = useQuery(["topMovies"], getTopMovies);

  return (
    <Container className={styles.bg}>
      <h1 className={styles.title}>Top 20 best movies!</h1>
      {isLoading && <Loading />}
      <ol className={styles.list}>
        {!isLoading &&
          data.results.map((movie) => (
            <Movie key={movie.id} title={movie.title} />
          ))}
      </ol>
      {error && <p>{error.message}</p>}
    </Container>
  );
};
export default MoviesList;
