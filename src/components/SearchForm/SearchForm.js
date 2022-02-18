import React from "react";
import findPath from '../../images/find.svg';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import './SearchForm.css';

function SearchForm(){
  return(
    <>
      <form className="search">
        <div className="search__content">
          <input type="search" className='search__input' placeholder='Фильм'></input>
          <button type="submit" className="search__button"><img src={findPath} className="search__sign" alt='Поиск'/></button>
        </div>
        <FilterCheckBox />
      </form>
      <hr className="search__line" />
    </>
  )
}

export default SearchForm;