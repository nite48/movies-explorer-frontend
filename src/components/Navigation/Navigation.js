import React from "react";
import { NavLink } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";
import "./Navigation.css";

function Navigation(props) {
  return (
    <>
      <div className={`navigation ${props.isOpen ? "" : "navigation_closed"}`}>
        <nav className="navigation__menu">
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={props.onCLose}
          >
            Главная
          </NavLink>
          <NavLink
            exact
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={props.onCLose}
          >
            Фильмы
          </NavLink>
          <NavLink
            exact
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={props.onCLose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <div className="navigation__profile">
          <div className="navigation__profile-wrap">
            <NavLink
              to="/profile"
              className="navigation__profile-link"
              activeClassName="navigation__profile-link_active"
              onClick={props.onClose}
            >
              Аккаунт
            </NavLink>
            <button className="navigator__icon">
              <img src={profileIcon} alt="Иконка профиля" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
