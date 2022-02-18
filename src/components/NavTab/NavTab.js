import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import './NavTab.css';

function NavTab() {
  return(
    <section className="nav">
      <nav className="nav__list">
        <Link to="#aboutProject" className="nav__item">О проекте</Link>
        <Link to="#stack" className="nav__item">Технологии</Link>
        <Link to="#aboutMe" className="nav__item">Студент</Link>
      </nav>
    </section>
  )
}
export default NavTab;