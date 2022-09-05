import { CircularProgress, IconButton, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MovieItem = (props) => {
  const deleteItem = () => {
    props.onDelete(props.item.id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
          {props.isDeletingMovie && <CircularProgress />}
          {!props.isDeletingMovie && <DeleteIcon />}
        </IconButton>
      }
    >
      {props.item.title}
    </ListItem>
  );
};

export default MovieItem;
