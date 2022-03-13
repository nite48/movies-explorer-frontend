import React from "react";
import findPath from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import "./SearchForm.css";
import searchPath from "../../images/search-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";

function SearchForm({ handleSearch, setPreloader, setIsChecked, isLoading }) {
  const { values, errors, isValid, handleChange } = useFormValidation({});

  const [keyword, setKeyword] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);

  function onCheckbox(checked) {
    setIsShortMovies(checked);
    setIsChecked(!isShortMovies);
  }

  function handleKeyword(evt) {
    handleChange(evt);
    setKeyword(evt.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(keyword);
    setPreloader(true);
  }
  return (
    <>
      <form className="search" onSubmit={handleSubmit} required>
        <div className="search__content">
          <img
            src={searchPath}
            className="search__icon"
            alt="Знак поиска - лупа"
          />
          <input
            type="search"
            className="search__input"
            name="keyword"
            placeholder="Фильм"
            autoComplete="off"
            value={values.keyword || ""}
            onChange={handleKeyword}
            disabled={isLoading}
            required
          ></input>
          <button
            type="submit"
            className={`search__button ${!isValid && "search__button_disable"}`}
            disabled={!isValid}
          >
            <img src={findPath} className="search__sign" alt="Поиск" />
          </button>
        </div>
        <hr className="search__vertical" />
        <FilterCheckBox onCheckbox={onCheckbox}/>
      </form>
      <hr className="search__line" />
    </>
  );
}

export default SearchForm;
