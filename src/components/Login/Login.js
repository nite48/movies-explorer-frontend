import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";

function Login({ isSending, handleLoginSubmit, isError }) {
  const emailInput = useInput('', {isEmpty: true, minLength: 2, isEmail: true});
  const passwordInput = useInput('', {isEmpty: true, minLength: 2});
  function handleSubmit(e) {
    e.preventDefault();

    handleLoginSubmit({
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
        <h2 className="register__title">Рады видеть!</h2>
        <form className="register__container" onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="userpassword" className="register__label">
              Пароль
            </label>
            <input
              className="register__input"
              value={passwordInput.value}
              onChange={passwordInput.handleInputChange}
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
            {isError ? 'Что-то пошло не так...' : ''}
          </span>
          <button
            type="submit"
            className={(emailInput.inputValid && passwordInput.inputValid && !isSending) ? `register__button-submit register__button-submit-in` : `form__button_disabled`}
          >
            Войти
          </button>
          <p className="register__info">
            Ещё не зарегистрированы?{" "}
            <Link to="/signup" className="register__redirect">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
export default Login;
