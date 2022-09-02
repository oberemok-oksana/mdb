import { getWatchedMovies } from "../api/index";
import { useQuery } from "@tanstack/react-query";
import Loading from "./ui/Loading";
import WatchedListMovie from "./WatchedListMovie";
import { Container, List, Paper } from "@mui/material";

const WatchedMovies = () => {
  const { data, isLoading } = useQuery(["watchedList"], getWatchedMovies);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <h1>Watched Movies</h1>
      <Paper>
        <List>
          {data.map((item) => (
            <WatchedListMovie key={item.id} item={item} />
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default WatchedMovies;
