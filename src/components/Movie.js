import styles from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li key={props.id} className={styles.item}>
      {props.title}
    </li>
  );
};

export default Movie;
