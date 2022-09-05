import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./ui/Loading";
import { useParams } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import {
  getMovieDetails,
  addMovieToWatchingList,
  addMovieToWatchedList,
  getWatchingList,
  getWatchedMovies,
} from "../api/index";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/system";
import { Box } from "@mui/material";

const MovieDetail = () => {
  const params = useParams();
  const { data, isLoading, error } = useQuery(["movies", params.movieId], () =>
    getMovieDetails(params.movieId)
  );
  const { data: watchingListData, isLoading: watchingListDataIsLoading } =
    useQuery(["watchingList"], getWatchingList);

  const { mutate, isLoading: addMovieLoading } = useMutation(
    addMovieToWatchingList,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("watchingList");
      },
    }
  );

  const { mutate: mutateWatched, isLoading: addMovieWatchedLoading } =
    useMutation(addMovieToWatchedList, {
      onSuccess: () => {
        queryClient.invalidateQueries("watchedList");
      },
    });

  const { data: watchedData, isLoading: watchedDataIsLoading } = useQuery(
    ["watchedList"],
    getWatchedMovies
  );
  const queryClient = useQueryClient();

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

  const addToWatchedList = () => {
    mutateWatched(data);
    notify();
  };

  if (isLoading || watchingListDataIsLoading || addMovieWatchedLoading) {
    return <Loading />;
  }

  const isExist = watchingListData.find((item) => item.id === data.id);
  const isWatched = watchedData.find((item) => item.id === data.id);

  return (
    <Container maxWidth="sm">
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
          <Box display="flex" justifyContent="center">
            <Stack direction="row" spacing={2}>
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
              {!isWatched && (
                <LoadingButton
                  color="success"
                  variant="contained"
                  onClick={addToWatchedList}
                  loading={addMovieWatchedLoading}
                >
                  Watched
                </LoadingButton>
              )}
            </Stack>
          </Box>
        </div>
      )}
      {error && <p>Some error occurred</p>}
    </Container>
  );
};

export default MovieDetail;
