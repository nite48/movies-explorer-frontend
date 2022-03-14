import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import logoPath from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { useMediaQuery } from "react-responsive";
import profileIcon from "../../images/profile-icon.svg";

function Header({ loggedIn }) {
  let location = useLocation();
  const [isNavPopupIsOpen, setIsNavPopupOpen] = React.useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 770px)" });
  function handleBurgerButtonClick() {
    setIsNavPopupOpen(true);
  }
  function closeNavPopup() {
    setIsNavPopupOpen(false);
  }
  const mobileClass = `${
    isMobile ? "header__signin_block" : "header__signin_block-on"
  }`;
  const loggedInClass = `${loggedIn ? "header__signin_block-off" : ""}`;
  return (
    <header
      className={`header ${
        location.pathname === "/"
          ? `header_theme_dark ${mobileClass} ${loggedInClass}`
          : ""
      }`}
    >
      {loggedIn ? (
        <>
          {!isMobile && (
            <>
              <div className="header__links">
                <nav className="header__menu">
                  <Link to="/">
                    <img
                      src={logoPath}
                      alt="Логотип"
                      className="header__logo"
                    />
                  </Link>
                  <NavLink
                    exact
                    to="/movies"
                    className="header__link"
                    activeClassName="header__link_active"
                  >
                    Фильмы
                  </NavLink>
                  <NavLink
                    exact
                    to="/saved-movies"
                    className="header__link"
                    activeClassName="header__link_active"
                  >
                    Сохранённые фильмы
                  </NavLink>
                </nav>
                <div className="header__profile">
                  <div className="header__profile-wrap">
                    <NavLink
                      to="/profile"
                      className="header__link"
                      activeClassName="header__link_active"
                    >
                      Аккаунт
                      <button className="header__profile-button">
                        <img src={profileIcon} alt="Иконка профиля" />
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="header__block" onClick={handleBurgerButtonClick}>
                <span className="header__block_sign"></span>
              </div>
            </>
          )}
          {isMobile && (
            <>
              <Link to="/">
                <img src={logoPath} alt="Логотип" className="header__logo" />
              </Link>
              <button
                className="header__burger-button"
                aria-label="button menu"
                type="button"
                onClick={handleBurgerButtonClick}
              ></button>
              <Navigation isOpen={isNavPopupIsOpen} onClose={closeNavPopup} />
            </>
          )}
        </>
      ) : (
        <div className="header__logout">
          <Link to="/">
            <img src={logoPath} alt="Логотип" className="header__logo" />
          </Link>
          <div>
            <Link to="/signup" className="header__link_signin">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link_signin">
              <button className="header__button">Вход</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
