import styles from "./Movie.module.css";
import { useHistory } from "react-router-dom";

const Movie = (props) => {
  const history = useHistory();

  const showDetails = (id) => {
    history.push(`/movies/${id}`);
  };

  return (
    <li
      key={props.id}
      className={styles.item}
      onClick={() => showDetails(props.id)}
    >
      <h3>{props.title}</h3>
      <span>
        (average vote: <span className={styles.vote}> {props.vote})</span>
      </span>
    </li>
  );
};

export default Movie;
