import "./Navigation.css";
import Logo from "../Logo/Logo";
import React from "react";
import { NavLink } from "react-router-dom";

function Navigation({ onMenuClick }) {
  return (
    <>
      <nav className="header__navigation">
        <div className="header__navigation-menu">
          <Logo />
          <NavLink to="/movies" className="header__navigation-link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="header__navigation-link">
            Сохраненные фильмы
          </NavLink>
        </div>
        <NavLink to="/profile" className="header__profile">
          Аккаунт <div className="header__profile-icon"></div>
        </NavLink>
        <div className="header__menu" onClick={onMenuClick}>
          <div className="header__menu-line"></div>
          <div className="header__menu-line"></div>
          <div className="header__menu-line"></div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
