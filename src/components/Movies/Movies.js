import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";

function Movies({
  loggedIn,
  isLoading,
  onSubmitSearch,
  movies,
  setPreloader,
  moviesSearchResponse,
  toggleMovieLike,
  checkBookmarkStatus,
  sortShortMovies,
}) {
  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(sortShortMovies(movies));
    }
  }, [isChecked]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="movies">
        <SearchForm
          handleSearch={onSubmitSearch}
          setPreloader={setPreloader}
          setIsChecked={setIsChecked}
          isLoading={isLoading}
        />
        {isLoading && <Preloader />}

        {moviesSearchResponse
          ? movies.length === 0 && (
              <p className="movies__response">{moviesSearchResponse}</p>
            )
          : movies.length === 0 && (
              <p className="movies__response">Нужно ввести ключевое слово</p>
            )}

        {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
          <p className="movies__response">Среди фильмов нет короткометражек</p>
        )}

        {movies.length !== 0 && (
          <MoviesCardList
            movies={isChecked ? shortMovies : movies}
            toggleMovieLike={toggleMovieLike}
            checkBookmarkStatus={checkBookmarkStatus}
            isSavedPage={false}
          />
        )}
      </section>
    </>
  );
}
export default Movies;
