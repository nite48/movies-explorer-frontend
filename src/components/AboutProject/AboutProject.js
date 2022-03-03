import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="aboutProject">
      <SectionTitle title="О проекте" />
      <div className="project__info">
        <div className="project__item">
          <h3 className="project__title">Дипломный проект включал 5 этапов</h3>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="project__item">
          <h3 className="project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="project__chart">
        <div className="project__first-item">
          <p className="project__duration">1 неделя</p>
        </div>
        <div className="project__second-item">
          <p className="project__duration project__duration-white">4 недели</p>
        </div>
      </div>

      <div className="project__chart">
        <div className="project__first-item_name">
          <p className="project__name">Back-end</p>
        </div>
        <div className="project__second-item_name">
          <p className="project__name">Front-end</p>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;
