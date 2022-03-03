import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { tempRenderMovies } from "../../utils/utils";

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={tempRenderMovies} isSaveMovies={false} />
      <button className="movies__more">Ещё</button>
    </section>
  );
}
export default Movies;
