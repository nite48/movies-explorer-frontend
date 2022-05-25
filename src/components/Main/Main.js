import React from "react";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Main(props) {
  return (
    <>
      <Header>
        {props.isLoggedIn ? (
          <Navigation onMenuClick={props.onMenuClick} />
        ) : (
          <>
            <Logo />
            <div className="header__container">
              <Link to="/signup" className="header__authentication-link">
                Регистрация
              </Link>
              <Link to="/signin" className="header__authentication-link">
                Войти
              </Link>
            </div>
          </>
        )}
      </Header>
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </>
  );
}
export default Main;
