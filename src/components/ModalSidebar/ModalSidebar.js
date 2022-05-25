import "./ModalSidebar.css";
import React from "react";
import { NavLink } from "react-router-dom";

function ModalSidebar(props) {
  const className = `modal-sidebar ${
    props.isOpen ? "modal-sidebar_opened" : ""
  }`;
  return (
    <div className={className}>
      <div className="modal-sidebar__overlay"></div>
      <div className="modal-sidebar__nav-container">
        <div>
          <nav className="modal-sidebar__nav">
            <div className="modal-sidebar__nav-links">
              <NavLink to="/" className="modal-sidebar__nav-link">
                Главная
              </NavLink>
              <NavLink to="/movies" className="modal-sidebar__nav-link">
                Фильмы
              </NavLink>
              <NavLink to="saved-movies" className="modal-sidebar__nav-link">
                Сохраненные фильмы
              </NavLink>
            </div>
            <NavLink to="/profile" className="modal-sidebar__profile">
              Аккаунт <div className="modal-sidebar__profile-icon"></div>
            </NavLink>
          </nav>
        </div>
        <button
          className="modal-sidebar__close-btn"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ModalSidebar;
