import React from "react";
import { NavLink } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";
import "./Navigation.css";
import closePopupPath from '../../images/close-icon.svg';

function Navigation({isOpen, onClose}) {
  return (
    <>
      <div className={`navigation ${isOpen ? "navigation_opened" : "navigation_closed"}`}>
      <button className="navigation__close"><img src={closePopupPath} onClick={onClose} className="navigation__close-icon" alt="крестик" /></button>
        <nav className="navigation__menu">
          <NavLink
            exact
            to="/"
            className="navigation__link"
            activeClassName="navigation__link_active"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            exact
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            exact
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
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
