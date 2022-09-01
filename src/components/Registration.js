import { useState } from "react";
import { signUpUser } from "../api";
import { useHistory, Link } from "react-router-dom";
import styles from "./Registration.module.css";
import Container from "./ui/Container";

const Registration = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const history = useHistory();

  const changeEmail = (e) => {
    setEnteredEmail(e.target.value);
  };

  const changePassword = (e) => {
    setEnteredPassword(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    console.log(userData);
    signUpUser(userData).then((data) => {
      if (data?.error?.message) {
        alert(data.error.message);
        return data;
      }
      setEnteredEmail("");
      setEnteredPassword("");
      history.push("/login");
    });
  };

  return (
    <Container>
      <form onSubmit={submitForm} className={styles.form}>
        <h2>Registration</h2>
        <div className={styles["form-control"]}>
          <label htmlFor="email">Email</label>
          <input type="email" value={enteredEmail} onChange={changeEmail} />
        </div>
        <div className={styles["form-control"]}>
          <label htmlFor="password">Email</label>
          <input
            type="password"
            value={enteredPassword}
            onChange={changePassword}
          />
        </div>
        <div>
          <button className={styles.button} type="submit">
            Sign Up!
          </button>
        </div>
        <Link className={styles.link} to="/login">
          Already have a registration
        </Link>
      </form>
    </Container>
  );
};

export default Registration;
