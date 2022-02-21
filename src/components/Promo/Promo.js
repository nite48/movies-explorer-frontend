import React from "react";
import imagePromo from "../../images/final_logo.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <img src={imagePromo} className="promo__img" alt="Логотип финала" />
      <h2 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h2>
    </section>
  );
}
export default Promo;
