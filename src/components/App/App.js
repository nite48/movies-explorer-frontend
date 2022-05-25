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
  getlogout,
  checkUserToken
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
import ModalSidebar from "../ModalSidebar/ModalSidebar";

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
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchResultMessage, setSearchResultMessage] = React.useState("");
  const [isActivePreloader, setIsActivePreloader] = React.useState(false);
  const [savedMoviesKeyword, setSavedMoviesKeyword] = React.useState("");
  const [showShortMovies, setShowShortMovies] = React.useState(() => {
    const showShortMoviesStatus = localStorage.getItem("showShortMovies");
    console.log(showShortMoviesStatus)
    return showShortMoviesStatus == null 
      ? false
      : JSON.parse(showShortMoviesStatus);
  });
  const [showShortSavedMovies, setShowShortSavedMovies] = React.useState(() => {
    const showShortMoviesStatus = localStorage.getItem("showShortSavedMovies");
    console.log(showShortMoviesStatus)
    return showShortMoviesStatus == null 
      ? false
      : JSON.parse(showShortMoviesStatus);
  });
  
  const [keyword, setKeyword] = React.useState(() => {
    const keyword = localStorage.getItem("keyword");
    return keyword == null ? "" : keyword;
  });
  const [isOpenWindow, setIsOpenWindow] = React.useState(false);
  const [updateProfileMessage, setUpdateProfileMessage] = React.useState("");
  const history = useHistory();
  const location = useLocation();
  const [searchedMovies, setSearchedMovies] = React.useState(() => {
    const movies = localStorage.getItem("searchedMovies");
    return movies == null ? [] : JSON.parse(movies);
  });

  React.useEffect(() => {   //+
    getUserProfile()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function tokenCheck(url) {
    setIsActivePreloader(true);
      checkUserToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push(url);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
          history.push("/");
        })
        .finally(() => setIsActivePreloader(false));
  }
  React.useEffect(() => tokenCheck(location.pathname), []); //+

  function handleRegister(name, email, password) {
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
          setIsSuccess(true);
          setLoggedIn(true);
          setIsInfoToolOpen(true);
          tokenCheck("/movies");
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
        setIsInfoToolOpen(false);
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
        setIsOpenWindow(false);
        showResponseMessageTimer(SERVER_ERROR_MESSAGE);
        console.log(err);
      })
      .finally(() =>{
        setIsInfoToolOpen(true);
      });
  }
  function handleOnOpen() {
    setIsOpenWindow(true);
  }

  function handleOnClose() {
    setIsOpenWindow(false);
    setIsInfoToolOpen(false);
  }

  function handleLogOut() {
    getlogout();
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("keyword");
    localStorage.removeItem("showShortMovies");
    localStorage.removeItem("showShortSavedMovies");
    localStorage.removeItem("savedMovies");
    setCurrentUser({ name: "", email: "" });
    setAllMovies([]);
    setSavedMovies([]);
    setLoggedIn(false);
    setKeyword("");
    setSearchedMovies([]);
    setShowShortMovies(false);
    setShowShortSavedMovies(false);
    history.push("/");
  }




  function showResponseMessageTimer(error) {
    setResponseMessage(error);
    setTimeout(() => setResponseMessage(""), 10000);
  }


  function getFavoriteMovies() {
    getSavedMovies()
      .then((savedMovies) => {
        if (currentUser != null) {
          const userSavedMovies = savedMovies.filter(
            (movie) => movie.owner === currentUser._id
          );
          setSavedMovies(userSavedMovies);
          localStorage.setItem("savedMovies", JSON.stringify(userSavedMovies));
        }
      })
      .catch((error) => {
        setSearchResultMessage(MOVIES_SERVER_ERROR_MESSAGE);
        console.log(error);
        setIsSuccess(false);
      });
  }
  

  function findMovie(data, keyword) {
    const result = data.filter((movie) => 
      (movie.nameRU != null &&
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase())) ||
      (movie.nameEN != null &&
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    if (result.length === 0 && location === "/movies") {
      setSearchResultMessage(MOVIES_NOT_FOUND_MESSAGE);
    }
    if (result.length === 0 && location === "/saved-movies") {
      setSearchResultMessage(SAVED_MOVIE_NOT_FOUND_MESSAGE);
    }
    if (result.length === 0 && location === "/saved-movies" && data.length === 0 ){
      getFavoriteMovies();
    }
    return result;
  }

  function filterShortMovies(movies) {
    if (location.pathname === '/movies'){
      if (movies.length > 0){
        return movies.filter((movie) => 
          showShortMovies ? movie.duration <= DURATION_FOR_SORTING_SHORT_FILM : true
        );
      }else{
        return movies;
      }
    } else if (location.pathname === '/saved-movies') {
      if (movies.length > 0){
        return movies.filter((movie) => 
          showShortSavedMovies ? movie.duration <= DURATION_FOR_SORTING_SHORT_FILM : true
        );
      }else{
        return movies;
      }
    }
    
  }

  function handleMovieSearch(name) {
    // setTimeout(() => setIsLoading(false), 1000);
    const foundMoviesList = findMovie(allMovies, name);
    setSearchedMovies(foundMoviesList)
    localStorage.setItem("searchedMovies", JSON.stringify(foundMoviesList));
    localStorage.setItem("keyword", name);
    localStorage.setItem("showShortMovies", JSON.stringify(showShortMovies));
    localStorage.setItem("showShortSavedMovies", JSON.stringify(showShortSavedMovies));
    setKeyword(name);
  }
  function toggleCheck(event){
    
    if (location.pathname === '/movies'){
      console.log(location.pathname)
      localStorage.setItem("showShortMovies", event.target.checked);
      setShowShortMovies(event.target.checked);
    } else {
      localStorage.setItem("showShortSavedMovies", event.target.checked);
      setShowShortSavedMovies(event.target.checked);
    }
    
  }

  // Saved movies search
  function handleSavedMovieSearch(name) {
    const moviesList = localStorage.getItem("savedMovies");
    const foundMoviesList = findMovie(JSON.parse(moviesList), name);
    setSavedMovies(foundMoviesList);
    setSavedMoviesKeyword(name);
  }

  function handleSaveMovie(movie) {
    saveMovie(movie)
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err)
      });
  }

  function handleDeleteMovie(movie) {
    const movieId = movie.id || movie.movieId;
    const currentMovie = savedMovies.find((m) => m.movieId === movieId);
    deleteMovie(currentMovie._id)
      .then((res) => {
        getFavoriteMovies();
      })
      .catch((err) =>{
        console.log(err)
        setIsSuccess(false);
      });
  }

  

  

  React.useEffect(() => { //+
    if (updateProfileMessage) {
      const timeout = setTimeout(() => setUpdateProfileMessage(""), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [updateProfileMessage]);

  React.useEffect(() => { //+
    getAllMovies()
      .then((allMovies) => {
        setAllMovies(allMovies);
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(err);
        setSearchResultMessage(MOVIES_SERVER_ERROR_MESSAGE);
        setIsSuccess(false);
      });
  }, [currentUser]);

  

  React.useEffect(() => {  //+
    getFavoriteMovies();
  }, [currentUser]);

  // auth user
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main 
                isLoggedIn={loggedIn}
                onMenuClick={handleOnOpen}
                onCloseSideBar={handleOnClose}/>
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
              exact
              path="/profile"
              component={Profile}
              isLoggedIn={loggedIn}
              onEditProfile={handleUpdateUser}
              onMenuClick={handleOnOpen}
              onLogOut={handleLogOut}
              apiResponseMessage={apiResponseMessage}
            />
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              isLoggedIn={loggedIn}
              allMovies={allMovies}
              searchedMovies={filterShortMovies(searchedMovies)}
              showShortMovies={showShortMovies}
              savedMovies={savedMovies}
              onSearchMovie={handleMovieSearch}
              keyword={keyword}
              onFilter={toggleCheck}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              searchResultMessage={searchResultMessage}
              isSavedMoviesPage={false}
              onMenuClick={handleOnOpen}
              isActivePreloader={isActivePreloader}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={loggedIn}
              onSearchMovie={handleSavedMovieSearch}
              keyword={savedMoviesKeyword}
              showShortMovies={showShortSavedMovies}
              onFilter={toggleCheck}
              savedMovies={filterShortMovies(savedMovies)}
              onDeleteMovie={handleDeleteMovie}
              isSavedMoviesPage={true}
              onMenuClick={handleOnOpen}
              updateSavedMovies={getFavoriteMovies}
            />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <ModalSidebar isOpen={isOpenWindow} onClose={handleOnClose} />
          <InfoToolTip
            isOpen={isInfoToolOpen}
            onClose={handleOnClose}
            onState={isSuccess}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
