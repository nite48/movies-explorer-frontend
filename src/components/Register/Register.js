import React from "react";
import logoPath from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return(
    <section className="register">
      <div className="register__content">
        <Link to='/'><img src={logoPath} alt="Логотип BeaFilm" className="register__logo"/></Link>
        <h2 className="register__title">Добро пожаловать !</h2>
        <form className="register__container">
          <div className="register__input-container">
            <label htmlFor='username' className='register__label'>Имя</label>
            <input className="register__input" type="text" placeholder="Имя"  required></input>
          </div>
          <div className="register__input-container">
            <label htmlFor='useremail' className='register__label'>E-mail</label>
            <input className="register__input" type="email" placeholder="Email"  required></input>
          </div>
          <div className="register__input-container">
            <label htmlFor='useremail' className='register__label'>Пароль</label>
            <input className="register__input" type="password" placeholder="Пароль" required></input>
          </div>
          <span className='register__input-error register__input-error_invisible'>Что-то пошло не так...</span>
        </form>
        <button type="submit" className="register__button-submit"> Зарегестрироваться</button>
        <p className="register__info">Уже зарегестрированы? <Link to="/signin" className="register__redirect" >Войти</Link></p>
      </div>
    </section>
  )
}

export default Register;