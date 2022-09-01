import Container from "./ui/Container";
import styles from "./Login.module.css";
import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { login } from "../api";
import { useHistory, Link } from "react-router-dom";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const emailIsValid = enteredEmail.includes("@");
  const emailIsInvalid = !emailIsValid && emailIsTouched;

  const passwordIsValid = enteredPassword.length > 7;
  const passwordIsInvalid = !passwordIsValid && passwordIsTouched;

  const formIsValid = !emailIsInvalid && !passwordIsInvalid;

  const changeEmail = (e) => {
    setEnteredEmail(e.target.value);
  };

  const focusEmail = () => {
    setEmailIsTouched(true);
  };

  const changePassword = (e) => {
    setEnteredPassword(e.target.value);
  };

  const focusPassword = () => {
    setPasswordIsTouched(true);
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    console.log(userData);
    login(userData)
      .then((response) => response.json())
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace("/");
      });
    //fetch
  };

  return (
    <Container>
      <form className={styles.form} onSubmit={submitForm}>
        <h2>Login</h2>
        <div className={styles["form-control"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={enteredEmail}
            onChange={changeEmail}
            onFocus={focusEmail}
          />
        </div>
        {emailIsInvalid && (
          <p className={styles["error-text"]}>Please type a valid email.</p>
        )}
        <div className={styles["form-control"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={changePassword}
            onFocus={focusPassword}
          />
        </div>
        {passwordIsInvalid && (
          <p className={styles["error-text"]}>
            Password should be more than 7 characters].
          </p>
        )}
        <div>
          <button
            disabled={!formIsValid}
            type="submit"
            className={styles.button}
          >
            Login!
          </button>
        </div>
        <Link className={styles.link} to="/signup">
          Don't have an account yet?
        </Link>
      </form>
    </Container>
  );
};

export default LoginForm;
