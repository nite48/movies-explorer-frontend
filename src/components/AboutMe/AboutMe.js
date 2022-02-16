import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import './AboutMe.css'
import photoStudent from '../../images/student_photo.jpg';
import { Link } from "react-router-dom";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe(){
  return(
    <section id="aboutMe" className="about">
      <SectionTitle title="Студент"/>
      <div className="about__wrap">
        <img src={photoStudent} className="about__photo" alt="Фото студента"/>
        <div className="about__info">
          <h3 className="about__name">Андрей</h3>
          <p className="about__dev">Fullstack-разработчик</p>
          <p className="about__info-me">Родился в Липецке. Работаю Fullstack-разработчиком в группе компании "НЛМК". 
          Живу в металлургческом городе, здесь одно из самых больших металлургических предприятий. </p>
            <div className="about__links">
              <Link to={{pathname: 'https://www.facebook.com'}} target='_blank' className="about_link">Facebook</Link>
              <Link to={{pathname: 'https://github.com'}} target='_blank' className="about_link">Github</Link>
            </div>
        </div>
      </div>
      <Portfolio/>
    </section>
  )
}
export default AboutMe;