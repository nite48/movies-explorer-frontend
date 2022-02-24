import React from "react";
import findPath from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import "./SearchForm.css";
import searchPath from '../../images/search-icon.svg';

function SearchForm() {
  return (
    <>
      <form className="search">
        <div className="search__content">
          <img src={searchPath} className="search__icon" alt="Знак поиска - лупа" />
          <input
            type="search"
            className="search__input"
            placeholder="Фильм"
          ></input>
          <button type="submit" className="search__button">
            <img src={findPath} className="search__sign" alt="Поиск" />
          </button>
        </div>
        <hr className="search__vertical" />
        <FilterCheckBox />
      </form>
      <hr className="search__line" />
    </>
  );
}

export default SearchForm;
