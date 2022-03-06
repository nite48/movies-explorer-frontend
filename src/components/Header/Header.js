import React from "react";
import { Link, Route, useLocation } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  return (
    <>
      <Route exact path="/">
        <header className="header header_theme_dark">
          <Link to="/">
            <img src={logoPath} alt="Логотип" className="header__logo" />
          </Link>
          <div>
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link">
              <button className="header__button">Вход</button>
            </Link>
          </div>
        </header>
      </Route>
      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header header_theme_black">
          <Link to="/">
            <img src={logoPath} alt="Логотип" className="header__logo" />
          </Link>
          <Navigation />
          <div className="header__block" onClick={props.onClickBlock}>
            <span className="header__block_sign"></span>
          </div>
        </header>
      </Route>
    </>
  );
}
export default Header;
