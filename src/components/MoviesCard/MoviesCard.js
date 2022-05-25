import React from "react";
import "./MoviesCard.css";
import { BASE_URL } from "../../utils/constants";

function MoviesCard({
  movie,
  savedMovies,
  isSavedMoviesPage,
  onSaveMovie,
  onDeleteMovie,
}) {
  const isSaved = isSavedMoviesPage ? true : savedMovies.some((m) => m.movieId === movie.id);

  const saveButtonClassName = `${
    isSavedMoviesPage
      ? "card__button_active-delete"
      : isSaved
      ? "card__button_active"
      : "card__button"
  }`;

  function handleSaveClick() {
    if (!isSaved) {
      onSaveMovie({
        country: movie.country ? movie.country : "",
        director: movie.director ? movie.director : "",
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : "",
        description: movie.description
          ? movie.description
          : movie.nameRU || movie.nameEN,
        image: `${BASE_URL}${movie.image ? movie.image.url : ""}`,
        trailer: movie.trailerLink,
        thumbnail: `${BASE_URL}${
          movie.image.formats.thumbnail ? movie.image.formats.thumbnail.url : ""
        }`,
        movieId: movie.id,
        nameRU: movie.nameRU ? movie.nameRU : movie.nameEN,
        nameEN: movie.nameEN ? movie.nameEN : movie.nameRU,
        isSaved: movie.isSaved,
      });
      // setIsSavedLike(true)
    } else {
      // setIsSavedLike(false)
      onDeleteMovie(movie);
    }
  }

  function calculateDuration(min) {
    return `${Math.floor(min / 60)}ч ${min % 60}м`;
  }

  const movieName = movie.nameRU;
  const movieImgURL = BASE_URL.concat("/", movie.image.url);
  const movieDuration = calculateDuration(movie.duration);

  return (
    <>
      <div className="card">
        <a href={isSavedMoviesPage ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="card__image" src={isSavedMoviesPage ? movie.image : movieImgURL} alt={movieName} />
        </a>
        <div className="card__head">
          <div className="card__info">
            <h2 className="card__title">{movieName}</h2>
            <button
              className={saveButtonClassName}
              type="button"
              onClick={handleSaveClick}
            ></button>
          </div>
          <p className="card__duration">{movieDuration}</p>
        </div>
      </div>
    </>
  );
}

export default MoviesCard;
