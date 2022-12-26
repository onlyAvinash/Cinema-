import React, { useEffect, useState } from "react";
import "./home.css";
import requests from "../Requests";
import Leftbar from "../components/leftbar/Leftbar";
import Main from "../components/main/Main";
import Navbar from "../components/navbar/Navbar";
import Rightbar from "../components/rightbar/Rightbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import axios from "axios";

let url = requests.requestPopular;
let arr = [
  "Popular",
  "Originals",
  "Top Rated",
  "Trending",
  "Horror",
  "Upcoming",
];

const Home = () => {
  const [url_set, setUrl] = useState(url);
  const [movies, setMovies] = useState([]);
  const [isImg, setIsImg] = useState(false); //we'll use this as a condition to check which data to display on center div we'll set it true when we click on some movie on rightbar and then on main component 'll check if it's true then show rightbar movie else show default movie

  const [rightbarMovie, setRightbarMovie] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios.get(url_set).then((response) => {
      setMovies(response.data.results);
      setIsImg(false);
    });
  }, [url_set]);

  const getCategory = (movieCategory) => {
    //this fn ll match the category we'r getting frm left bar on click nd then it'll change the url for that based on tht category
    if (movieCategory === "Popular") {
      url = requests.requestPopular;
    }
    if (movieCategory === "Originals") {
      url = requests.requestTopRated;
    }
    if (movieCategory === "Top Rated") {
      url = requests.requestNow_playing;
    }
    if (movieCategory === "Trending") {
      url = requests.requestTrending;
    }
    if (movieCategory === "Horror") {
      url = requests.requestHorror;
    }
    if (movieCategory === "Upcoming") {
      url = requests.requestUpcoming;
    }
    setUrl(url);
  };

  const getRightbarMovie = (rightbarMovieData) => {
    setRightbarMovie(rightbarMovieData);
    setIsImg(true);
  };

  const handleEnter = (e) => {
    //this is to fire the search fn on enter
    if (e.key === "Enter") {
      // console.log("user pressed",e.key);
      handleSearchFn();
    }
  };

  const handleSearchFn = () => {
    // this is to search the movies using search bar at top
    url =
      "https://api.themoviedb.org/3/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
      search;
    setUrl(url);
    // console.log(movies);
    // console.log(search);
    setSearch("");
  };

  return (
    <div className="home">
      <Navbar
        handleEnter={handleEnter}
        searchMoviefn={handleSearchFn}
        setSearch={setSearch}
        search={search}
      />
      <div className="mid">
        <Leftbar category={arr} getCategory={getCategory}></Leftbar>

        <Main
          isImg={isImg}
          rightbarMovie={rightbarMovie}
          defaultMovies={movies}
        ></Main>

        <Rightbar
          movies={movies}
          getRightbarMovie={getRightbarMovie}
        ></Rightbar>
      </div>

      {/* this is to start foooter for mobile or less than 800px*/}

      <div className="downfooter">
        <div className="downFooterLogo">CINEMA+</div>

        <div className="divIcon">
          <TwitterIcon></TwitterIcon>
          <FacebookIcon></FacebookIcon>
          <TelegramIcon></TelegramIcon>
          <InstagramIcon></InstagramIcon>
        </div>
        <hr className="hrLine" />
      </div>
    </div>
  );
};

export default Home;
