import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

function Profile({ loggedIn, userData, onEditProfile, onLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormValidation({
    email: currentUser.email,
    name: currentUser.name,
  });

  const [isValuesNotMatched, setisValuesNotMatched] = React.useState(false);

  function checkValues() {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email 
      
    ) {
      setisValuesNotMatched(false);
    } else {
      setisValuesNotMatched(true);
    }
  }

  React.useEffect(() => {
    checkValues();
  }, [handleChange]);

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values);
  }
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <div className="profile__content">
          <h2 className="profile__greetings">Привет, {userData.name}!</h2>
          <form onSubmit={handleOnSubmit} noValidate>
            <div className="profile__info">
              <label className="profile__label">Имя</label>
              <input
                className="profile__input"
                name="name"
                type="text"
                placeholder="Имя"
                required
                value={values.name || ""}
                onChange={handleChange}
              />
            </div>
            <span className="form__item-error">{errors.name}</span>
            <hr className="profile__line" />
            <div className="profile__info">
              <label className="profile__label">E-mail</label>
              <input
                className="profile__input"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={values.email || ""}
                onChange={handleChange}
              />
            </div>
            <span className="form__item-error">{errors.email}</span>
            <button
              type="submit"
              className={
                isValid && isValuesNotMatched
                  ? "profile__edit"
                  : "profile__edit profile__button_disable"
              }
              onClick={handleOnSubmit}
              disabled={!isValuesNotMatched}
            >
              {isValid && isValuesNotMatched ? "Сохранить" : "Редактировать"}
            </button>
          </form>
          <Link to="/" className="profile__quit" onClick={onLogOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </>
  );
}

export default Profile;
