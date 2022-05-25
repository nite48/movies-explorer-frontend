import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

import "./SavedMovies.css";

function SavedMovies(props) {
  console.log(props.savedMovies)
  return (
    <>
      <Header>
        <Navigation onMenuClick={props.onMenuClick} />
      </Header>
      <section className="saved-movies">
        <SearchForm
          onSearchMovie={props.onSearchMovie}
          isSavedMoviesPage={props.isSavedMoviesPage}
          keyword={props.keyword}
          onFilter={props.onFilter}
          isChecked={props.showShortMovies}>
        </SearchForm>
        <MoviesCardList
          movies={props.savedMovies}
          savedMovies={props.savedMovies}
          onDeleteMovie={props.onDeleteMovie}
          isSavedMoviesPage={props.isSavedMoviesPage}
        />

        <div className="saved-movies__dev"></div>
      </section>
    </>
  );
}

export default SavedMovies;
