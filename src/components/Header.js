import styles from "./Header.module.css";
import Container from "./ui/Container";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Container className={styles.flex}>
        <div className={styles["left-navbar"]}>
          <div className={styles.logo}>KMDb</div>
          <input type="search" placeholder="Search" />
        </div>
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/"
                activeClassName={styles.active}
                className={styles.item}
                exact
              >
                Top 10 movies |
              </NavLink>
            </li>
            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/my-watching-list"
                  activeClassName={styles.active}
                  className={styles.item}
                >
                  My watching list |
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/login"
                  activeClassName={styles.active}
                  className={styles.item}
                >
                  Login |
                </NavLink>
              </li>
            )}

            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/login"
                  activeClassName={styles.active}
                  className={styles.item}
                  onClick={authCtx.logout}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
