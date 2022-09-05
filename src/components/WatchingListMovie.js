import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovie } from "../api";
import MovieItem from "./MovieItem";

const WatchingListMovie = (props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeletingMovie } = useMutation(deleteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries("watchingList");
    },
  });

  return (
    <MovieItem
      item={props.item}
      onDelete={mutate}
      isDeletingMovie={isDeletingMovie}
    />
  );
};

export default WatchingListMovie;
