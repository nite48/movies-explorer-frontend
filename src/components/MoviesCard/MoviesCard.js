import React from "react";
import "./MoviesCard.css";

function MoviesCard({ movie, onLikeClick, checkBookmarkStatus }) {
  const { nameEN, duration, image, trailer } = movie;
  const isLiked = checkBookmarkStatus(movie);
  const durationConverter = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };
  const cardLikeButtonClassName = `card__button ${
    isLiked ? "card__button_active" : ""
  }`;
  function handleBookmarkClick() {
    onLikeClick(movie, isLiked);
  }

  return (
    <div className="card">
      <a href={trailer} target="_blank" rel="noopener noreferrer">
        <img className="card__image" src={image} alt="Постер фильма" />
      </a>
      <div className="card__head">
        <div className="card__info">
          <h2 className="card__title">{nameEN}</h2>
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleBookmarkClick}
          ></button>
        </div>
        <p className="card__duration">{durationConverter(duration)}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
