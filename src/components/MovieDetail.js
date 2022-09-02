import { useMutation, useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api";
import Loading from "./ui/Loading";
import { useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import Button from "@mui/material/Button";
import { addMovieToWatchingList, getWatchingList } from "../api/index";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const MovieDetail = () => {
  const params = useParams();
  const { data, isLoading, error } = useQuery(["movies", params.movieId], () =>
    getMovieDetails(params.movieId)
  );
  const { data: watchingListData, isLoading: watchingListDataIsLoading } =
    useQuery(["watchingList"], getWatchingList);

  const { mutate, isLoading: addMovieLoading } = useMutation(
    addMovieToWatchingList
  );

  const notify = () =>
    toast("Movie was added!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addMovie = () => {
    mutate(data);
    notify();
  };

  if (isLoading || watchingListDataIsLoading) {
    return <Loading />;
  }

  const isExist = watchingListData.find((item) => item.id === data.id);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
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
          {!isExist && (
            <LoadingButton
              variant="contained"
              color="success"
              onClick={addMovie}
              loading={addMovieLoading}
            >
              + Watching List
            </LoadingButton>
          )}
        </div>
      )}
      {error && <p>Some error occurred</p>}
    </>
  );
};

export default MovieDetail;
