import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMoviesByGenre } from "../store/movieSlice";
import { Helmet } from "react-helmet";
import { telegramRequestGroup } from "../constant";
import Pagination from "./Pagination";

const GenreMovies = () => {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    dispatch(fetchMoviesByGenre(genre));
  }, [dispatch, genre]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  let content;
  const shimmerCards = Array.from({ length: moviesPerPage }).map((_, index) => (
    <div
      key={index}
      className="shimmer-wrapper flex lg:w-56 lg:p-4 rounded-lg lg:items-center lg:justify-center lg:flex-col"
    >
      <div className="shimmer w-[120px] lg:w-[200px] lg:h-[300px] h-[200px] rounded-lg mb-4"></div>
      <div className="flex flex-col">
        <div className="shimmer w-[200px] ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[200px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
        <div className="shimmer w-[80px] mt-3 ml-4 lg:w-[150px] h-5 rounded"></div>
      </div>
    </div>
  ));

  if (movieStatus === "loading") {
    content = (
      <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">
        {shimmerCards}
      </div>
    );
  } else if (movies.length === 0) {
    content = (
      <div className="h-[100vh] flex-col items-center justify-center">
        <p className="text-white">No movies available in this genre 😔</p>
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
  } else if (movieStatus === "failed") {
    content = <p className="text-white">{error}</p>;
  }

  return (
    <div className="p-8 lg:py-20 w-full min-h-screen bg-background">
      <Helmet>
        <title>{genre} Movies - Ocean Of Movies</title>
        <meta name="description" content={`Watch and download ${genre} movies`} />
      </Helmet>

      <h1 className="text-2xl flex lg:ml-[138px] sm:text-3xl md:text-4xl tracking-tighter text-white font-bold mb-6">
        {genre} Movies
      </h1>

      <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">
        {content}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={movies.length}
        itemsPerPage={moviesPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default GenreMovies;
