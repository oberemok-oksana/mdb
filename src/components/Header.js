import styles from "./Header.module.css";
import Container from "./ui/Container";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import SearchForm from "./SearchForm";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <Container className={styles.flex}>
        <div className={styles["left-navbar"]}>
          <div className={styles.logo}>KMDb</div>
          <SearchForm />
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
                Top 10 Movies |
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watched"
                activeClassName={styles.active}
                className={styles.item}
              >
                Watched Movies |
              </NavLink>
            </li>
            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/my-watching-list"
                  activeClassName={styles.active}
                  className={styles.item}
                >
                  My Watching List |
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
