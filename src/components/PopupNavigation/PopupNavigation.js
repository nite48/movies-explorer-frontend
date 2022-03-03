import React from "react";
import "./PopupNavigation.css";
import Navigation from "../Navigation/Navigation";
import closePopupImage from "../../images/close-popup.svg";

function PopupNavigation(props) {
  return (
    <div className={`popup ${props.isOpen ? "" : "popup_closed"}`}>
      <div className="popup__container">
        <button className="popup__close">
          <img
            src={closePopupImage}
            className="popup__close-icon"
            alt="Крест"
            onClick={props.onClose}
          />
        </button>
        <Navigation onClose={props.onClose} isOpen={props.isOpen} />
      </div>
    </div>
  );
}

export default PopupNavigation;
