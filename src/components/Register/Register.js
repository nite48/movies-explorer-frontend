import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";
import "./Register.css";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ onRegister, apiResponseMessage }) {
  const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({});

    function handleOnSubmit(evt) {
        evt.preventDefault();
        onRegister(values);
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
        <h2 className="register__title">Добро пожаловать !</h2>
        <form className="register__container" onSubmit={handleOnSubmit}>
          <div className="register__input-container">
            <label htmlFor="username" className="register__label">
              Имя
            </label>
            <input
              className="register__input"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
              type="text"
              placeholder="Имя"
              autoComplete="off"
              required
            />
            <span className="form__item-error">
              {errors.name}
            </span>
          </div>
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
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              placeholder="Email"
              autoComplete="off"
              required
            />
            <span className="form__item-error">
              {errors.email}
            </span>
          </div>
          <div className="register__input-container">
            <label htmlFor="useremail" className="register__label">
              Пароль
            </label>
            <input
              className="register__input"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              type="password"
              minLength="8"
              placeholder="Пароль"
              autoComplete="off"
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
            disabled={!isValid}>
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
