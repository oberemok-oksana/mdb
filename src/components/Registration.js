import { useState } from "react";
import { signUpUser } from "../api";
import { useHistory } from "react-router-dom";

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
    <form onSubmit={submitForm}>
      <h2>Registration</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" value={enteredEmail} onChange={changeEmail} />
      </div>
      <div>
        <label htmlFor="password">Email</label>
        <input
          type="password"
          value={enteredPassword}
          onChange={changePassword}
        />
      </div>
      <div>
        <button type="submit">Sign Up!</button>
      </div>
    </form>
  );
};

export default Registration;
