import React from "react";
import findPath from "../../images/find.svg";
import "./SearchForm.css";
import searchPath from "../../images/search-icon.svg";
import useFormValidation from "../../hooks/useFormValidation";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

function SearchForm(props) {
  const { isValid, handleChange } = useFormValidation({});

  const [searchMovie, setSearchMovie] = React.useState(props.keyword);

  function handleKeyword(evt) {
    handleChange(evt);
    setSearchMovie(evt.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearchMovie(searchMovie);
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
            value={searchMovie}
            onChange={handleKeyword}
            required
          ></input>
          <button
            type="submit"
            className={`search__button ${!isValid && "search__button_disable"}`}
            onClick={handleSubmit}
          >
            <img src={findPath} className="search__sign" alt="Поиск" />
          </button>
        </div>
        <hr className="search__vertical" />
        <FilterCheckBox
          onFilter={props.onFilter}
          isChecked={props.isChecked}
        />
      </form>
      <hr className="search__line" />
    </>
  );
}

export default SearchForm;
