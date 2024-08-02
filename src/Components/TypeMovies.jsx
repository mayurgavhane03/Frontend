import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchMoviesByType } from "../store/movieSlice";
import { Helmet } from "react-helmet";
import { telegramRequestGroup } from "../constant";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";

const TypeMovies = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const typeMovies = useSelector((state) => state.movies.typeMovies);
  const typeStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    dispatch(fetchMoviesByType(type));
  }, [dispatch, type]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = typeMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  let content;

  if (typeStatus === 'loading') {
    content = <Shimmer cardsCount={moviesPerPage} />;
  } else if (typeStatus === 'failed') {
    content = <p className="text-white">{error}</p>;
  } else if (typeMovies.length === 0) {
    content = (
      <div className="h-[100vh] flex-col items-center justify-center">
        <p className="text-white">No movies available for this type 😔</p>
        <p className="text-white mt-5">
          📌 If movies are not available, request them in our Telegram Group{" "}
          <a className="text-blue-500 font-bold" href={telegramRequestGroup} target="_blank" rel="noopener noreferrer">
            HERE
          </a>
        </p>
      </div>
    );
  } else {
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
  }

  const getTitle = (type) => {
    switch (type) {
      case '18':
        return "18+";
      case 'kdrama':
        return "K Drama";
      case 'netflix':
        return "NetFlix";
      default:
        return "";
    }
  };

  const title = getTitle(type);

  return (
    <div className="p-8 lg:py-20 w-full min-h-screen bg-background">
      <Helmet>
        <title>{title} Movies - Ocean Of Movies</title>
        <meta name="description" content={`Watch and download ${title} movies`} />
      </Helmet>

      <h1 className="text-2xl flex lg:ml-[138px] sm:text-3xl md:text-4xl tracking-tighter text-white font-bold mb-6">
        {title} Movies
      </h1>

      <div className="flex flex-wrap lg:justify-center h-[100%] gap-6">
        {content}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={typeMovies.length}
        itemsPerPage={moviesPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TypeMovies;
