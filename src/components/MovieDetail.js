import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api";
import Loading from "./ui/Loading";
import { useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";

const MovieDetail = () => {
  const params = useParams();
  const { data, isLoading, error } = useQuery(["movies", params.movieId], () =>
    getMovieDetails(params.movieId)
  );

  console.log(params);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={styles.card}>
          <h1>{data.title}</h1>
          <div className={styles.description}>
            <div>
              <span className={styles.text}> Runtime: </span> {data.runtime}{" "}
              minutes
            </div>
            <div>
              <span className={styles.text}>Popularity: </span>
              {data.popularity.toFixed(2)}
            </div>
            <div>
              <span className={styles.text}>Release date: </span>
              {data.release_date}
            </div>
            <div>{data.overview}</div>
          </div>
        </div>
      )}
      {error && <p>Some error occurred</p>}
    </>
  );
};

export default MovieDetail;
