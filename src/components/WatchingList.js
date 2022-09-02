import { getWatchingList } from "../api";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import Loading from "./ui/Loading";

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
              <ListItemButton key={item.id}>{item.title}</ListItemButton>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default WatchingList;
