import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Header from "../Header/Header";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Navigation from "../Navigation/Navigation";

function Movies({
  searchedMovies,
  showShortMovies,
  savedMovies,
  onSearchMovie,
  keyword,
  onFilter,
  onSaveMovie,
  onDeleteMovie,
  isSavedMoviesPage,
  onMenuClick,
}) {
  return (
    <>
      <Header>
        <Navigation onMenuClick={onMenuClick}/>
      </Header>
      <section className="movies">
        <SearchForm
          onSearchMovie={onSearchMovie}
          isSavedMoviesPage={isSavedMoviesPage}
          keyword={keyword}
          onFilter={onFilter}
          isChecked={showShortMovies}
        />
        <MoviesCardList
          movies={searchedMovies}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          isSavedMoviesPage={isSavedMoviesPage}
        />
      </section>
    </>
  );
}
export default Movies;
