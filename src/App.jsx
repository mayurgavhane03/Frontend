import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainPage from "./Components/MainPage";
import MovieDetail from "./Components/MovieDetail";
import MovieForm from "./Components/MovieForm";
import Header from "./Components/Header";
import Logo from "./Components/Logo";
import Footer from "./Components/Footer";
import NavBar from "./Components/Navbar";
import VideoPlayer from "./Components/VideoPlayer";
import DMCAPolicy from "./Components/Navbar Compnents/DMCAPolicy ";
import DisclaimerPolicy from "./Components/Navbar Compnents/DisclaimerPolicy";
import ContactForm from "./Components/Navbar Compnents/ContactForm";
import GenreMovies from "./Components/GenreMovies";
import Banner from "./Components/Banner";
import { message } from "./constant";
import TypeMovies from "./Components/TypeMovies";
 

const AppLayout = () => {
  return (
    <div>
      <NavBar/>
      <Logo />
      <Banner message={message} />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "categories/:genre",
        element: <GenreMovies />,
      },
      {
        path:"categories/movietype/:type",
        element:<TypeMovies  />

      },
      {
        path: "how-to-download",
        element: <VideoPlayer />
      },
      {
        path: "dmca-policy",
        element: <DMCAPolicy />
      },
      {
        path:"declaimer",
        element:<DisclaimerPolicy />
      },
      {
        path:"contact",
        element:<ContactForm />
      },
    ],
  },
]);

const App = () => {
  //this is use for thie desable the right click on the whole application
  useEffect(() => {
    const disableRightClick = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', disableRightClick);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []); 

  return (
    <div className="h-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
