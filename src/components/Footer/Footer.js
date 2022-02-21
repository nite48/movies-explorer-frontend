import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

import "./Footer.css";

function Footer() {
  return (
    <Route exact path={["/"]}>
      <footer className="footer">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <hr className="footer__line" />
        <div className="footer__info">
          <p className="footer__copyright">&copy; 2022</p>
          <nav className="footer__nav">
            <Link
              to={{ pathname: "https://practicum.yandex.ru" }}
              target="_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </Link>
            <Link
              to={{ pathname: "https://github.com/yandex-praktikum" }}
              target="_blank"
              className="footer__link"
            >
              Github
            </Link>
            <Link
              to={{ pathname: "https://www.facebook.com/yandex.practicum/" }}
              target="_blank"
              className="footer__link"
            >
              Facebook
            </Link>
          </nav>
        </div>
      </footer>
    </Route>
  );
}

export default Footer;
