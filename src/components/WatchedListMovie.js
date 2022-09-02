import { CircularProgress, IconButton, ListItem } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWatchedMovie } from "../api";

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
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => mutate(props.item.id)}
        >
          {isDeletingMovie && <CircularProgress />}
          {!isDeletingMovie && <DeleteIcon />}
        </IconButton>
      }
    >
      {props.item.title}
    </ListItem>
  );
};

export default WatchedListMovie;
