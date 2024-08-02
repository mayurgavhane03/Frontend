// MainPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies, fetchMoviesByGenre } from "../store/movieSlice";
import { Helmet } from "react-helmet";
import { telegramRequestGroup } from "../constant";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer"; // Import the Shimmer component

const MainPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const searchResults = useSelector((state) => state.movies.searchResults);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const genre = useSelector((state) => state.movies.genre);
  const searchStatus = useSelector((state) => state.movies.searchStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    if (movieStatus === "idle") {
      if (genre) {
        dispatch(fetchMoviesByGenre(genre));
      } else {
        dispatch(fetchMovies());
      }
    }
  }, [movieStatus, dispatch, genre]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstMovie, indexOfLastMovie)
      : movies.slice(indexOfFirstMovie, indexOfLastMovie);

  let content;

  if (movieStatus === "loading") {
    content = <Shimmer cardsCount={moviesPerPage} />; // Use the Shimmer component
  } else if (searchResults.length === 0 && movies.length === 0) {
    content = (
      <div className="h-[100vh] flex-col items-center justify-center">
        <p className="text-white">Movie not available 😔</p>
        <p className="text-white mt-5">
          📌If Movie not available then Request in our Telegram Group{" "}
          <a className="text-blue-500 font-bold" href={telegramRequestGroup}>
            HERE
          </a>
        </p>
      </div>
    );
  } else if (currentMovies.length > 0) {
    content = currentMovies.map((movie) => (
      <Link key={movie._id} to={`/movie/${movie._id}`} className="no-underline">
        <div className="flex lg:w-56 lg:p-4 rounded-lg lg:items-center lg:justify-center lg:flex-col">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-[120px] lg:w-[200px] rounded-lg mb-4"
          />
          <h3 className="text-[17px] ml-5 text-white text-base font-medium">
            {movie.title}
          </h3>
        </div>
      </Link>
    ));
  } else if (movieStatus === "succeeded" && movies.length === 0) {
    content = (
      <div className="h-[100vh]">
        <p className="text-white">Movie not available</p>
      </div>
    );
  } else if (movieStatus === "failed" || searchStatus === "failed") {
    content = <p className="text-white">{error}</p>;
  }

  return (
    <div className="p-8 lg:py-20 w-full min-h-screen bg-background">
      <Helmet>
        <title>Ocean Of Movies</title>
        <meta name="description" content={`Watch and download Any Movie`} />
      </Helmet>

      <h1 className="text-2xl flex lg:ml-[138px] sm:text-3xl md:text-4xl tracking-tighter text-white font-bold mb-6">
        Latest Updates!
      </h1>
      <h1 className="hidden lg:block text-sm lg:ml-[138px] text-white font-bold mb-6 absolute top-[45%] right-0 transform translate-x-[-50%] translate-y-[50%]">
        {movies.length}
      </h1>

      <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">
        {content}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={searchResults.length > 0 ? searchResults.length : movies.length}
        itemsPerPage={moviesPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MainPage;
  