import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Login({ onLogin, apiResponseMessage }) {
  const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({});

    function handleOnSubmit(evt) {
        evt.preventDefault();
        onLogin(values.email, values.password);
        resetForm();
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
        <form className="register__container" onSubmit={handleOnSubmit} noValidate>
          <div className="register__input-container">
            <label htmlFor="useremail" className="register__label">
              E-mail
            </label>
            <input
              className="register__input"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
            />
            <span className="form__item-error">
              {errors.email}
            </span>
          </div>
          <div className="register__input-container">
            <label htmlFor="userpassword" className="register__label">
              Пароль
            </label>
            <input
              className="register__input"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              type="password"
              placeholder="Пароль"
              required
            />
            <span className="form__item-error">
              {errors.password}
            </span>
          </div>
          <span className="register__input-error register__input-error_invisible">
            {apiResponseMessage}
          </span>
          <button
            type="submit"
            className={`register__button-submit ${
              !isValid && "register__submit-button_disable"
            }`}
            disabled={!isValid}
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
