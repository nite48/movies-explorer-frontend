import React from "react";
import { Route } from "react-router-dom";
import findPath from "../../images/find.svg";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import "./SearchForm.css";
import searchPath from "../../images/search-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";

function SearchForm({ handleSearch, setPreloader, setIsChecked, isLoading }) {
  const { isValid, handleChange } = useFormValidation({});

  const [keyword, setKeyword] = React.useState("");
  const [keywordSaved, setKeywordSaved] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);

  function onCheckbox(checked) {
    console.log(checked)
    setIsShortMovies(checked);
    setIsChecked(!isShortMovies);
  }

  function handleKeyword(evt) {
    handleChange(evt);
    setKeyword(evt.target.value);
  }
  function handleKeywordSaved(evt) {
    handleChange(evt);
    setKeywordSaved(evt.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(keyword);
    setPreloader(true);
    localStorage.setItem('lastSearchName', JSON.stringify(keyword));
  }
  function handleSubmitSaved(event) {
    event.preventDefault();
    handleSearch(keywordSaved);
    setPreloader(true);
    localStorage.setItem('lastSearchNameSaved', JSON.stringify(keywordSaved));
  }
  React.useEffect(() => {
    const lastSearchNameValue = JSON.parse(localStorage.getItem('lastSearchName'));
    if (lastSearchNameValue) {
      setKeyword(lastSearchNameValue);
    }
  }, []);
  React.useEffect(() => {
    const lastSearchNameValueSaved = JSON.parse(localStorage.getItem('lastSearchNameSaved'));
    if (lastSearchNameValueSaved) {
      setKeywordSaved(lastSearchNameValueSaved);
    }
  }, []);
  return (
    <>
      <Route exact path="/movies">
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
              value={keyword}
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
          <FilterCheckBox onCheckbox={onCheckbox} />
        </form>
        <hr className="search__line" />
      </Route>
      <Route exact path="/saved-movies">
        <form className="search" onSubmit={handleSubmitSaved} required>
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
              value={keywordSaved}
              onChange={handleKeywordSaved}
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
          <FilterCheckBox onCheckbox={onCheckbox} />
        </form>
    <hr className="search__line" />
        
      </Route>
    </>
  );
}

export default SearchForm;
