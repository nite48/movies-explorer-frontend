import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__content">
        <h2 className="profile__greetings">Привет, user!</h2>
        <form>
          <div className="profile__info">
            <label className="profile__label">Имя</label>
            <input
              type="text"
              className="profile__input"
              defaultValue=""
              placeholder="Имя"
            />
          </div>
          <hr className="profile__line" />
          <div className="profile__info">
            <label className="profile__label">E-mail</label>
            <input
              type="text"
              className="profile__input"
              defaultValue="example@yandex.ru"
              placeholder="Email"
            />
          </div>
          <button type="submit" className="profile__edit">
            Редактировать
          </button>
        </form>
        <Link to="/" className="profile__quit">
          Выйти из аккаунта
        </Link>
      </div>
    </section>
  );
}

export default Profile;
