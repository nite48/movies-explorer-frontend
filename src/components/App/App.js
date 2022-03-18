import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import { DURATION_FOR_SORTING_SHORT_FILM } from "../../utils/constants";
import "./App.css";
import {
  signUp,
  signIn,
  getUserProfile,
  getSavedMovies,
  updateUserProfile,
  deleteMovie,
  saveMovie,
  getlogout
} from "../../utils/MainApi";
import {
  CONFLICT_EMAIL_MESSAGE,
  INVALID_DATA_MESSAGE,
  AUTH_DATA_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
  MOVIES_SERVER_ERROR_MESSAGE,
  MOVIES_NOT_FOUND_MESSAGE,
  SAVED_MOVIE_NOT_FOUND_MESSAGE,
  SUCCSESS_UPDATE_MESSAGE,
  IMAGE_NOT_FOUND,
} from "../../utils/responseMessages";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getAllMovies } from "../../utils/MoviesApi";
import { Redirect } from "react-router-dom";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [apiResponseMessage, setResponseMessage] = React.useState(" ");
  const [allMovies, setAllmovies] = React.useState([]);
  const [searchMoviesResult, setSearchMoviesResult] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [shortMovie , setShortMovie] = React.useState([]);
  const [moviesSearchResponse, setMoviesSearchResponse] = React.useState("");
  const [savedMoviesSearchResponse, setSavedMoviesSearchResponse] =
    React.useState("");
  const history = useHistory();
  let location = useLocation().pathname;

  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push(location);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
          history.push("/");
        });
    }
  }
  function onCloseAllPopup() {
    setIsInfoToolOpen(false)
  }

  function handleRegister({ name, email, password }) {
    signUp(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === "Error 400") {
          return showResponseMessageTimer(INVALID_DATA_MESSAGE);
        }
        if (err === "Error 409") {
          return showResponseMessageTimer(CONFLICT_EMAIL_MESSAGE);
        }
        if (err === "Error 500") {
          return showResponseMessageTimer(SERVER_ERROR_MESSAGE);
        }
        setIsSuccess(false);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsSuccess(true);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === "Error 400") {
          return showResponseMessageTimer(INVALID_DATA_MESSAGE);
        }
        if (err === "Error 401") {
          return showResponseMessageTimer(AUTH_DATA_ERROR_MESSAGE);
        }
        if (err === "Error 500") {
          console.log(SERVER_ERROR_MESSAGE);
          return showResponseMessageTimer(SERVER_ERROR_MESSAGE);
        }
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() =>{
        setIsInfoToolOpen(true);
      });
  }

  function handleUpdateUser(userData) {
    updateUserProfile(userData.name, userData.email)
      .then((res) => {
        if (res) {
          setCurrentUser({
            ...currentUser,
            name: res.name,
            email: res.email,
          });
          setIsSuccess(true);
          showResponseMessageTimer(SUCCSESS_UPDATE_MESSAGE);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoToolOpen(false);
        showResponseMessageTimer(SERVER_ERROR_MESSAGE);
        console.log(err);
      })
      .finally(() =>{
        setIsInfoToolOpen(true);
      });
  }

  function handleLogOut() {
    getlogout();
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("searchResult");
    localStorage.removeItem("lastSearchName");
    localStorage.removeItem("lastCheckBoxState");
    localStorage.removeItem("lastSearchNameSaved");
    localStorage.removeItem("lastCheckBoxStateSaved");
    setCurrentUser({ name: "", email: "" });
    setAllmovies([]);
    setSearchMoviesResult([]);
    setMoviesSearchResponse([]);
    setSavedMovies([]);
    setLoggedIn(false);
    history.push("/");
  }

  function showResponseMessageTimer(error) {
    setResponseMessage(error);
    setTimeout(() => setResponseMessage(""), 10000);
  }

  function getBeatMovies() {
    setIsLoading(true);
    getAllMovies()
      .then((data) => {
        const moviesArray = data.map((item) => {
          const imageURL = item.image
            ? `https://api.nomoreparties.co${item.image.url}`
            : IMAGE_NOT_FOUND;
          const thumbnailURL = item.image
            ? `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`
            : IMAGE_NOT_FOUND;
          const noAdaptedName = item.nameEN ? item.nameEN : item.nameRU;
          const countryValue = item.country ? item.country : "none";
          return {
            country: countryValue,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: imageURL,
            trailer: item.trailerLink,
            thumbnail: thumbnailURL,
            movieId: item.id,
            nameRU: item.nameRU,
            nameEN: noAdaptedName,
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesArray));
      })
      .catch((err) => {
        setMoviesSearchResponse(MOVIES_SERVER_ERROR_MESSAGE);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getFavoriteMovies() {
    getSavedMovies()
      .then((favouriteMovies) => {
        localStorage.setItem("dataSearchSaved", favouriteMovies)
        setSavedMovies(favouriteMovies);
      })
      .catch((error) => {
        setMoviesSearchResponse(MOVIES_SERVER_ERROR_MESSAGE);
        console.log(error);
      });
  }

  function search(data, keyword) {
    const result = data.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.description.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    if (result.length === 0 && location === "/movies") {
      setMoviesSearchResponse(MOVIES_NOT_FOUND_MESSAGE);
    }
    if (result.length === 0 && location === "/saved-movies") {
      setSavedMoviesSearchResponse(SAVED_MOVIE_NOT_FOUND_MESSAGE);
    }
    if (result.length === 0 && location === "/saved-movies" && data.length === 0 ){
      getFavoriteMovies();
    }
    return result;
  }

  function sortShortMovies(movies) {
    const shortMoviesArray = movies.filter(
      (movie) => movie.duration <= DURATION_FOR_SORTING_SHORT_FILM
    );
    console.log(shortMoviesArray)
    setShortMovie(shortMoviesArray)
    // localStorage.setItem('resultFilter', JSON.stringify(shortMoviesArray));  //Осуществялется поиск по коротко метражкам
    // console.log(localStorage.getItem('resultFilter'))
    return shortMoviesArray;
  }

  function submitSearch(keyword) {
    console.log(allMovies)
    setTimeout(() => setIsLoading(false), 1000);
    setSearchMoviesResult(search(allMovies, keyword));
    localStorage.setItem(
      "searchResult",
      JSON.stringify(search(allMovies, keyword))
    );
  }

  function submitFavoriteSearch(keyword) {
    setTimeout(() => setIsLoading(false), 1000);
    setSavedMovies(search(savedMovies, keyword));
  }

  function addMovie(movie) {
    saveMovie(movie)
      .then((res) => {
        const newSavedMovie = res;
        setSavedMovies([...savedMovies, newSavedMovie]);
      })
      .catch((err) => console.log(err));
  }

  function removeMovies(movie) {
    const movieId = savedMovies.find(
      (item) => item.movieId === movie.movieId
    )._id;
    deleteMovie(movieId)
      .then((res) => {
        getFavoriteMovies();
      })
      .catch((err) => console.log(err));
  }

  function checkBookmarkStatus(movie) {
    return savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
  }

  function toggleMovieLike(movie, isLiked) {
    isLiked ? removeMovies(movie) : addMovie(movie);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    } else {
      Promise.all([getUserProfile(), getFavoriteMovies()])
        .then(([userData, favoriteMovieData]) => {
          setCurrentUser({
            ...currentUser,
            name: userData.name,
            email: userData.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    console.log(movies)
    if (movies) {
      setAllmovies(movies);
      const searchResult = JSON.parse(localStorage.getItem("searchResult"));
      if (searchResult) {
        setSearchMoviesResult(searchResult);
      }
    } else {
      getBeatMovies();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn} />
              <Footer />
            </Route>
            <Route path="/signup">
              {loggedIn ? <Redirect to="/"/>:
              <Register
                onRegister={handleRegister}
                apiResponseMessage={apiResponseMessage}
              />}
            </Route>
            <Route path="/signin">
              {loggedIn ? <Redirect to="/"/>:
              <Login
                onLogin={handleLogin}
                apiResponseMessage={apiResponseMessage}
              />}
            </Route>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              userData={currentUser}
              apiResponseMessage={apiResponseMessage}
              onEditProfile={handleUpdateUser}
              onLogOut={handleLogOut}
            />
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              onSubmitSearch={submitSearch}
              sortShortMovies={sortShortMovies}
              setPreloader={setIsLoading}
              moviesSearchResponse={moviesSearchResponse}
              movies={searchMoviesResult}
              toggleMovieLike={toggleMovieLike}
              checkBookmarkStatus={checkBookmarkStatus}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              isLoading={isLoading}
              onSubmitSearch={submitFavoriteSearch}
              sortShortMovies={sortShortMovies}
              setPreloader={setIsLoading}
              moviesSearchResponse={savedMoviesSearchResponse}
              movies={savedMovies}
              toggleMovieLike={toggleMovieLike}
              checkBookmarkStatus={checkBookmarkStatus}
            />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <InfoToolTip
            isOpen={isInfoToolOpen}
            onClose={onCloseAllPopup}
            onState={isSuccess}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
