import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Register.css";
import useInput from "../../hooks/useInput";

function Register({ isSending, handleRegisterSubmit, isError }) {
  const nameInput = useInput('', {isEmpty: true, minLength: 2, isName: true});
  const emailInput = useInput('', {isEmpty: true, minLength: 2, isEmail: true});
  const passwordInput = useInput('', {isEmpty: true, minLength: 2});
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e)

    handleRegisterSubmit({
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
  return (
    <section className="register">
      <div className="register__content">
        <Link to="/">
          <img
            src={logoPath}
            alt="Логотип BeaFilm"
            className="register__logo"
          />
        </Link>
        <h2 className="register__title">Добро пожаловать !</h2>
        <form className="register__container" onSubmit={handleSubmit} noValidate>
          <div className="register__input-container">
            <label htmlFor="username" className="register__label">
              Имя
            </label>
            <input
              className="register__input"
              value={nameInput.value}
              onChange={nameInput.handleInputChange}
              onFocus={() => {nameInput.handleOnFocus(true)}}
              type="text"
              placeholder="Имя"
              readOnly={isSending}
              required
            />
            <span className="form__item-error">
              {(nameInput.isOnFocus && nameInput.errorText) && nameInput.errorText}
            </span>
          </div>
          <div className="register__input-container">
            <label htmlFor="useremail" className="register__label">
              E-mail
            </label>
            <input
              className="register__input"
              value={emailInput.value}
              onChange={emailInput.handleInputChange}
              onFocus={() => {emailInput.handleOnFocus(true)}}
              type="email"
              placeholder="Email"
              readOnly={isSending}
              required
            />
            <span className="form__item-error">
              {(emailInput.isOnFocus && emailInput.errorText) && emailInput.errorText}
            </span>
          </div>
          <div className="register__input-container">
            <label htmlFor="useremail" className="register__label">
              Пароль
            </label>
            <input
              className="register__input"
              onChange={passwordInput.handleInputChange}
              value={passwordInput.value}
              onFocus={() => {passwordInput.handleOnFocus(true)}}
              type="password"
              placeholder="Пароль"
              readOnly={isSending}
              required
            />
            <span className="form__item-error">
              {(passwordInput.isOnFocus && passwordInput.errorText) && passwordInput.errorText}
            </span>
          </div>
          <span className="register__input-error register__input-error_invisible">
          {isError ? 'Произошла ошибка. Попробуйте снова.' : ''}
          </span>
          <button type="submit" className={(nameInput.inputValid && emailInput.inputValid && passwordInput.inputValid && !isSending) ? `register__button-submit` : `register__button-submit`}>
            Зарегестрироваться
          </button>
          <p className="register__info">
            Уже зарегестрированы?{" "}
            <Link to="/signin" className="register__redirect">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
