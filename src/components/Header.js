import styles from "./Header.module.css";
import Link from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["left-navbar"]}>
        <div>Logo</div>
        <input type="search" />
      </div>
      <nav>
        <ul className={styles.nav}>
          <li>Top 10 movies</li>
          <li>My watching list</li>
          <li>Login</li>
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
