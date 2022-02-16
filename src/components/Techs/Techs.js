import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

function Techs(){
  return(
    <section id="stack" className="techs">
      <SectionTitle title='Технологии'/>
      <h3 className="techs__title">7 технологий</h3>
      <div>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className="techs__items">
        <div className='techs__item'>HTML</div>
        <div className='techs__item'>CSS</div>
        <div className='techs__item'>JS</div>
        <div className='techs__item'>React</div>
        <div className='techs__item'>Git</div>
        <div className='techs__item'>Express.js</div>
        <div className='techs__item'>mongoDB</div>
      </div>
    </section>
  )
}
export default Techs;