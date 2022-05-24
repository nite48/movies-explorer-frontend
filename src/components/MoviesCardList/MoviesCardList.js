import React, { Suspense } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {
  LARGE_SCREEN_RESOLUTION,
  MEDIUM_SCREEN_RESOLUTION,
  MAX_NUMBER_MOVIES,
  MID_NUMBER_MOVIES,
  MIN_NUMBER_MOVIES,
  ADD_MAX_NUMBER_MOVIES,
  ADD_MIN_NUMBER_MOVIES,
} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {

  function calculateShowMore() {
    return window.innerWidth > LARGE_SCREEN_RESOLUTION ? ADD_MAX_NUMBER_MOVIES : ADD_MIN_NUMBER_MOVIES;
  }

  //number of movies to render
  const [totalNumberToRender, setTotalNumberToRender] = React.useState(() => {
    if (window.innerWidth > LARGE_SCREEN_RESOLUTION) {
      return MAX_NUMBER_MOVIES;
    } else if (window.innerWidth > MEDIUM_SCREEN_RESOLUTION) {
      return MID_NUMBER_MOVIES;
    } else return MIN_NUMBER_MOVIES;
  });

  function handleMoreClick() {
    const moviesNumber = totalNumberToRender + calculateShowMore();

    if (moviesNumber < props.movies.length) {
      setTotalNumberToRender(moviesNumber);
    } else {
      setTotalNumberToRender(props.movies.length);
    }
  }
  const message =
    props.movies.length <= 0
      ? props.isSavedMoviesPage
        ? "Пока нет сохраненных фильмов"
        : "Фильмов не найдено"
      : null;
  return (
    <section className="card-list">
      <Suspense fallback={<Preloader />}>
        <p className="card-list__message">{message}</p>
        <div className="card-list__elements">
          {props.movies
            .slice(
              0,
              props.isSavedMoviesPage
                ? props.movies.length
                : totalNumberToRender
            )
            .map((movie) => (
              <MoviesCard
                movie={movie}
                savedMovies={props.savedMovies}
                key={movie.id || movie.movieId}
                onSaveMovie={props.onSaveMovie}
                onDeleteMovie={props.onDeleteMovie}
                isSavedMoviesPage={props.isSavedMoviesPage}
              />
          ))}
        </div>
      </Suspense>
      {props.movies.length > 0 &&
        !props.isSavedMoviesPage && totalNumberToRender < props.movies.length && (
          <button
            className="movies__more"
            aria-label="Загрузка фильмов"
            onClick={handleMoreClick}
          >
            Ещё
          </button>
      )}
    </section>
  );
}

export default MoviesCardList;
