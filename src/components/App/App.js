import React from "react";
import Header from "../Header/Header";
import { Route, Switch, useHistory, useLocation  } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PopupNavigation from "../PopupNavigation/PopupNavigation";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from "../PageNotFound/PageNotFound";
import './App.css';
import {signUp, signIn, getUserProfile, getSavedMovies} from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isPopupNavigation, setIsPopupNavigation] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({name:'', email: '', _id: ''});
  const history = useHistory();
  const location = useLocation();

  const handleMenuClick = () => {
    setIsPopupNavigation(true);
  };
  const closePopupNavigation = () => {
    setIsPopupNavigation(false);
  };
  function handleRegisterSubmit(data) {
    console.log(data)
    setIsError(false);
    setIsSending(true);

    signUp(data.name, data.email, data.password )
    .then((data) => {
      setIsSuccess(true);
      history.push('/signin');

    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
      setIsError(true);
    })
    .finally(() => {
      setIsSending(false);
    })
  }
  function handleLoginSubmit(data) {
    setIsError(false);
    setIsSending(true);

    signIn(data.email, data.password )
    .then((data) => {
      setLoggedIn(true);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
    })
    .finally(() => {
      setIsSending(false);
    })
  }
  React.useEffect(() => {
    if (loggedIn && token) {
      getUserProfile(token)
      .then(([ userData, savedMoviesData ]) => {
        getSavedMovies(savedMoviesData.data.reduce((stack, item) => {
          (item.owner._id === userData.data._id && stack.push(item));

          return stack;
        }, []));

        setCurrentUser(userData.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [token, loggedIn]);
  React.useEffect(() => {
    if (loggedIn) {
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        history.push('/movies');
      }
    }
  }, [location.pathname, loggedIn, history]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn} onClickBlock={handleMenuClick} />
              <Main />
            <Footer />
          </Route>
          <Route path="/signup">
            <Register 
              handleRegisterSubmit={handleRegisterSubmit}
              isError={isError}
              isSending={isSending}/>
          </Route>
          <Route path="/signin">
            <Login 
              handleLoginSubmit={handleLoginSubmit}
              isError={isError}
              isSending={isSending}/>
          </Route>
          <ProtectedRoute path="/profile" 
            component={Profile}/>
          <ProtectedRoute exact path="/movies"
            component={Movies}/>
          <ProtectedRoute exact path="/saved-movies"
            component={SavedMovies} />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <PopupNavigation
          isOpen={isPopupNavigation}
          onClose={closePopupNavigation}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
