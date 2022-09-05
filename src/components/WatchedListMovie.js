import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWatchedMovie } from "../api";
import MovieItem from "./MovieItem";

const WatchedListMovie = (props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeletingMovie } = useMutation(
    deleteWatchedMovie,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("watchedList");
      },
    }
  );

  return (
    <MovieItem
      item={props.item}
      onDelete={mutate}
      isDeletingMovie={isDeletingMovie}
    />
  );
};

export default WatchedListMovie;
