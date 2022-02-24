import React from "react";
import Header from "../Header/Header";
import { Switch, Route } from "react-router-dom";
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

function App() {
  const [isPopupNavigation, setIsPopupNavigation] = React.useState(false);

  const handleMenuClick = () => {
    setIsPopupNavigation(true);
  };
  const closePopupNavigation = () => {
    setIsPopupNavigation(false);
  };
  return (
    <div className="page">
      <Header onClickBlock={handleMenuClick} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
      <PopupNavigation
        isOpen={isPopupNavigation}
        onClose={closePopupNavigation}
      />
    </div>
  );
}

export default App;
