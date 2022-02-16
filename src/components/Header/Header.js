import React from "react";
import { Link, Route } from 'react-router-dom';
import logoPath from '../../images/logo.svg';
import './Header.css';

function Header(){
  return(
    <>
      <Route exact path='/'>
        <header className="header header_theme_dark">
          <Link to='/'><img src={logoPath} alt='Логотип' className="header__logo"/></Link>
          <div>
            <Link to='/signup' className="header__link">Регистрация</Link>
            <Link to='/signin' className="header__link"><button className="header__button">Вход</button></Link>
          </div>
        </header>
      </Route>
    </>
  )
}
export default Header;