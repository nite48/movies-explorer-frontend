import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
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
        <form className="register__container">
          <div className="register__input-container">
            <label htmlFor="useremail" className="register__label">
              E-mail
            </label>
            <input
              className="register__input"
              type="email"
              placeholder="Email"
              required
            ></input>
          </div>
          <div className="register__input-container">
            <label htmlFor="userpassword" className="register__label">
              Пароль
            </label>
            <input
              className="register__input"
              type="password"
              placeholder="Пароль"
              required
            ></input>
          </div>
          <span className="register__input-error register__input-error_invisible">
            Что-то пошло не так...
          </span>
        </form>
        <button
          type="submit"
          className="register__button-submit register__button-submit-in"
        >
          Войти
        </button>
        <p className="register__info">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="register__redirect">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
}
export default Login;
