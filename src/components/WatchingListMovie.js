import { CircularProgress, IconButton, ListItem } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMovie } from "../api";

const WatchingListMovie = (props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeletingMovie } = useMutation(deleteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries("watchingList");
    },
  });

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

export default WatchingListMovie;
