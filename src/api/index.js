export const getTopMovies = () => {
  return fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=091a850778d47440ea8d7d370d18ef7d&language=en-US&page=2"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

export const getMovieDetails = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=091a850778d47440ea8d7d370d18ef7d&language=en-US`
  ).then((response) => response.json());
};

export const signUpUser = (data) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmi7oZigu8USzrJQB-AuVHW6b-DpavcvM",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  ).then((response) => response.json());
};

export const login = (userData) => {
  return fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmi7oZigu8USzrJQB-AuVHW6b-DpavcvM",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );
};

export const addMovieToWatchingList = (movieData) => {
  return fetch(
    `https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/movieList/${movieData.id}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    }
  );
};

export const getWatchingList = () => {
  return fetch(
    "https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/movieList.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const movies = [];
      for (let id in data) {
        movies.push(data[id]);
      }

      return movies;
    });
};

export const deleteMovie = (id) => {
  return fetch(
    `https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/movieList/${id}.json`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const addMovieToWatchedList = (movieData) => {
  return fetch(
    `https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/watchedMoviesList/${movieData.id}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    }
  );
};

export const getWatchedMovies = () => {
  return fetch(
    "https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/watchedMoviesList.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const watchedMovies = [];
      for (let id in data) {
        watchedMovies.push(data[id]);
      }

      return watchedMovies;
    });
};

export const deleteWatchedMovie = (id) => {
  return fetch(
    `https://react-http-145af-default-rtdb.asia-southeast1.firebasedatabase.app/watchedMoviesList/${id}.json`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const findMovie = (name) => {
  return fetch(`
https://api.themoviedb.org/3/search/movie?api_key=091a850778d47440ea8d7d370d18ef7d&language=en-US&query=${name}&page=1&include_adult=false`).then(
    (response) => response.json()
  );
};
