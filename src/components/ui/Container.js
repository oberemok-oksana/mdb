import styles from "./Container.module.css";

const Container = (props) => {
  const classes = `${styles.container} ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

export default Container;
