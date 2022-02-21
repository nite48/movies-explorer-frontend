import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { tempRenderForSaved } from "../../utils/utils";

import "./SavedMovies.css";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={tempRenderForSaved} isSavedMovies={true} />
      <div className="saved-movies__dev"></div>
    </section>
  );
}

export default SavedMovies;
