import { getWatchingList } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Container, List, Paper } from "@mui/material";
import Loading from "./ui/Loading";
import WatchingListMovie from "./WatchingListMovie";

const WatchingList = () => {
  const { data, isLoading, error } = useQuery(
    ["watchingList"],
    getWatchingList
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Container maxWidth="sm">
        <h1>My Watching List!</h1>
        <Paper>
          <List>
            {data.map((item) => (
              <WatchingListMovie key={item.id} item={item} />
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default WatchingList;
