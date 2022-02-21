import React from "react";
import "./Portfolio.css";
import arrow from "../../images/arrow.svg";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <nav>
        <Link
          to={{ pathname: "https://github.com/nite48/how-to-learn" }}
          target="_blank"
          className="portfolio__link"
        >
          <div className="portfolio__item">
            <p className="portfolio__name">Статичный сайт</p>
            <img src={arrow} className="portfolio__image" alt="Стрелка" />
          </div>
        </Link>
        <hr className="portfolio__line" />
        <Link
          to={{
            pathname: "https://nite48.github.io/russian-travel/index.html",
          }}
          target="_blank"
          className="portfolio__link"
        >
          <div className="portfolio__item">
            <p className="portfolio__name">Адаптивный сайт</p>
            <img src={arrow} className="portfolio__image" alt="Стрелка" />
          </div>
        </Link>
        <hr className="portfolio__line" />
        <Link
          to={{ pathname: "https://insta.copy.project.nomoredomains.work/" }}
          target="_blank"
          className="portfolio__link"
        >
          <div className="portfolio__item">
            <p className="portfolio__name">Одностраничное приложение</p>
            <img src={arrow} className="portfolio__image" alt="Стрелка" />
          </div>
        </Link>
        <hr className="portfolio__line" />
      </nav>
    </div>
  );
}
export default Portfolio;
