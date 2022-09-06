import { CircularProgress, IconButton, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Rating } from "@mui/material";
import styles from "./MovieItem.module.css";
import { getRating, setRating } from "../api/index";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Loading from "./ui/Loading";

const MovieItem = (props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(setRating, {
    onMutate: ({ rating }) => {
      queryClient.setQueryData(["rating", props.item.id], { value: rating });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rating", props.item.id]);
    },
  });

  const { data, isLoading, error } = useQuery(["rating", props.item.id], () =>
    getRating(props.item.id)
  );

  const changeRating = (e, value) => {
    mutate({ rating: value, id: props.item.id });
  };

  const deleteItem = () => {
    props.onDelete(props.item.id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ListItem
      secondaryAction={
        <div className={styles.wrapper}>
          {error ? (
            <p>{error}</p>
          ) : (
            <Rating value={data?.value ?? 0} onChange={changeRating} />
          )}
          <IconButton edge="end" aria-label="delete" onClick={deleteItem}>
            {props.isDeletingMovie && <CircularProgress />}
            {!props.isDeletingMovie && <DeleteIcon />}
          </IconButton>
        </div>
      }
    >
      {props.item.title}
    </ListItem>
  );
};

export default MovieItem;
