import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HeaderPage from "../src/pages/HeaderPage";
import HomePage from "./pages/HomePage";
import MyWatchingListPage from "./pages/MyWatchingListPage";
import LoginPage from "./pages/LoginPage";
import MovieDetail from "../src/components/MovieDetail";
import Registration from "./components/Registration";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchedMovies from "./components/WatchedMovies";
import SearchingResults from "./components/SearchingResults";

const queryClient = new QueryClient();

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <HeaderPage />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {authCtx.isLoggedIn && (
            <Route path="/my-watching-list">
              <MyWatchingListPage />
            </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Route path="/login">
              <LoginPage />
            </Route>
          )}
          <Route path="/movies/:movieId">
            <MovieDetail />
          </Route>
          <Route path="/signup">
            <Registration />
          </Route>
          <Route path="/watched">
            <WatchedMovies />
          </Route>
          <Route path="/searching-results/:name">
            <SearchingResults />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
