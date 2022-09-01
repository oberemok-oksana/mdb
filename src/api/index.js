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
