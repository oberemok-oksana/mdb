import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HeaderPage from "../src/pages/HeaderPage";
import HomePage from "./pages/HomePage";
import MyWatchingListPage from "./pages/MyWatchingListPage";
import LoginPage from "./pages/LoginPage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <HeaderPage />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/my-watching-list">
            <MyWatchingListPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;
