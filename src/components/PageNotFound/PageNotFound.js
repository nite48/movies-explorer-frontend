import React from "react";
import "./PageNotFound.css";
import { useHistory } from "react-router-dom";

function PageNotFound() {
  const history = useHistory();
  return (
    <>
      <h2 className="page-not-found__title">404</h2>
      <p className="page-not-found__info">Страница не найдена</p>
      <div className="page-not-found__wrap">
        <button
          type="button"
          role="link"
          className="not-found__go-back-button"
          onClick={() => history.goBack()}
        >
          Назад
        </button>
      </div>
    </>
  );
}

export default PageNotFound;
