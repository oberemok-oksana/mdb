import {
  Container,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { findMovie } from "../api";
import Loading from "./ui/Loading";
import { useHistory, useParams } from "react-router-dom";

const SearchingResults = () => {
  const params = useParams();
  const history = useHistory();
  const { data, isLoading, error } = useQuery(
    ["searchingResults", params.name],
    () => findMovie(params.name)
  );

  if (isLoading) {
    return <Loading />;
  }

  const showMovieDetail = (id) => {
    history.push(`/movies/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <h1>We found something:</h1>
      <Paper>
        <List>
          {data.results.map((item) => (
            <ListItemButton onClick={() => showMovieDetail(item.id)}>
              {item.title}
            </ListItemButton>
          ))}
        </List>
        {error && <p>{error}</p>}
      </Paper>
    </Container>
  );
};

export default SearchingResults;
