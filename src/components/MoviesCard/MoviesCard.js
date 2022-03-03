import React from "react";
import picturePath from "../../images/kommunist.png";
import "./MoviesCard.css";

function MoviesCard(props) {
  const [isSaved, setIsSaved] = React.useState(false);
  const handleSaveClick = () => {
    setIsSaved(isSaved ? false : true);
  };

  return (
    <div className="card">
      <img className="card__image" src={picturePath} alt="Постер фильма" />
      <div className="card__head">
        <div className="card__info">
          <h2 className="card__title">Рудбой</h2>
          {props.isSavedMovie ? (
            <button className="card__close-button"></button>
          ) : (
            <button
              className={`card__button ${isSaved ? "card__button_active" : ""}`}
              onClick={handleSaveClick}
            ></button>
          )}
        </div>
        <p className="card__duration">1ч 42м</p>
      </div>
    </div>
  );
}

export default MoviesCard;
