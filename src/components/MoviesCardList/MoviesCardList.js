import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <>
      <div className="card-list">
        {props.cards.map((card, index) => {
          return (
            <MoviesCard key={index} isSaved={props.isSavedMovie}></MoviesCard>
          );
        })}
      </div>
    </>
  );
}

export default MoviesCardList;
