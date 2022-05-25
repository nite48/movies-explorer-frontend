import React from "react";
import okIcon from '../../images/Union.png';
import errorIcon from '../../images/error.png'
import './InfoToolTip.css';
import { Route } from "react-router-dom";

function InfoToolTip({ isOpen, onClose, onState }){
  return(
    <>
      <Route exact path={['/signin', '/signup']}>
        <div className={isOpen  ?`popup popup_activated popup_activated-messages`: `popup popup__info-tooltip`}>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
          <div className="popup__container">
            <img className="popup__image-status" alt="Уведомление" src={onState ? okIcon : errorIcon} />
            <h2 className="popup__message-status">{onState ? 'Вы успешно вошли !':'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
        </div>
      </Route>
      <Route exact path={['/profile']}>
        <div className={isOpen  ?`popup popup_activated popup_activated-messages`: `popup popup__info-tooltip`}>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
          <div className="popup__container">
            <img className="popup__image-status" alt="Уведомление" src={onState ? okIcon : errorIcon} />
            <h2 className="popup__message-status">{onState ? 'Вы успешно изменили профиль !':'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
        </div>
      </Route>
      <Route exact path={['/movies', '/saved-movies']}>
        <div className={isOpen  ?`popup popup_activated popup_activated-messages`: `popup popup__info-tooltip`}>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
          <div className="popup__container">
            <img className="popup__image-status" alt="Уведомление" src={onState ? okIcon : errorIcon} />
            <h2 className="popup__message-status">{onState ? 'Запрос успешен !':'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
          </div>
        </div>
      </Route>
  </>
  )
}

export default InfoToolTip;