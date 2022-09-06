import Button from "@mui/material/Button";
import styles from "./SearchForm.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();

    history.push(`/searching-results/${searchValue}`);
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <input
        type="search"
        placeholder="Search"
        value={searchValue}
        onChange={changeSearchValue}
      />
      <Button size="small" variant="contained" type="submit">
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
