import React, { useEffect, useState } from "react";
import "./main.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
//this is to import material ui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Rating } from "@mui/material";

const Main = ({ rightbarMovie, isImg, defaultMovies }) => {
  //responsive
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const screenWidth = width < 600 ? "45vh" : width < 1000 ? "45vh" : "640px";
  const screenHight = width < 600 ? "30vh" : width < 1000 ? "30vh" : "360px";
  // console.warn(width);

  // console.log("this is rightbar path",showImage);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [openMod, setOpenMod] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  const defaultMovie = defaultMovies[0];
  // this is for image in main div
  const rightbarCheckImg =
    rightbarMovie?.backdrop_path ?? rightbarMovie?.poster_path; //this is to check backdrop is null or not
  const rightbarShowImg =
    "https://image.tmdb.org/t/p/original/" + rightbarCheckImg;
  const mainFetchImg =
    "https://image.tmdb.org/t/p/original/" + defaultMovie?.backdrop_path;

  //this is for title of the movie
  const rightbarCheckTitle = rightbarMovie?.title
    ? rightbarMovie?.title
    : rightbarMovie?.original_name;

  const defaultMovieCheckTitle = defaultMovie?.title
    ? defaultMovie?.title
    : defaultMovie?.original_name;

  const rightbarCheckDate = rightbarMovie?.release_date //this is for Date of the movie
    ? rightbarMovie?.release_date
    : rightbarMovie?.first_air_date;

  const defaultMovieCheckDate = defaultMovie?.release_date
    ? defaultMovie?.release_date
    : defaultMovie?.first_air_date;

  const votings = isImg
    ? rightbarMovie?.vote_average
    : rightbarMovie?.vote_average; //it will get the voting from fetched data;
  const rating = //this 'll insure how may stars any movie should get based or their votings
    votings <= 2
      ? 0.5
      : votings <= 4
      ? 1.5
      : votings <= 6
      ? 2.5
      : votings <= 8
      ? 3.5
      : 4.5;

  const shortOverview = (str, num) => {
    //this fn ll make the movie desc shorter
    if (str?.length > num) {
      return str.slice(0, num) + "........";
    } else {
      return str;
    }
  };

  const handleVideo = (videoTitle) => {
    //this fn ll get the title ,then fetch the URL based on the that title

    movieTrailer(videoTitle).then((res) => {
      setVideoURL(res);
      handleOpen();
    });
  };

  return (
    <div className="main">
      <div
        className="mainImg"
        style={{
          background: `linear-gradient(0.25turn, black,rgba(255, 255, 255, 0)),center/cover url(${
            isImg ? rightbarShowImg : mainFetchImg
          }) `,
        }}
      >
        {/* <img className='mainImgPic' src={ isImg ? rightbarShowImg :mainFetchImg } alt={isImg ? showImage?.title : film?.title} /> */}
      </div>

      <div className="mainImgAbout">
        <h1 className="mainImgAboutTitle">
          {isImg ? rightbarCheckTitle : defaultMovieCheckTitle}
        </h1>
        <div className="mainImgAboutButtons">
          <button
            className="mainImgAboutButtonOne"
            type="button"
            onClick={() =>
              handleVideo(isImg ? rightbarCheckTitle : defaultMovie?.title)
            }
          >
            Play
          </button>
          {/* <button className="mainImgAboutButtonTwo">Watch Later</button> */}
          <p className="mainImgAboutDate">
            Released: &nbsp;
            {isImg ? rightbarCheckDate : defaultMovieCheckDate}
          </p>
          <p className="mainImgAboutDate">
            <Rating
              name="half-rating-read"
              value={rating}
              precision={0.5}
              readOnly
            />{" "}
          </p>
          <p className="mainImgAboutDesc">
            {shortOverview(
              isImg ? rightbarMovie?.overview : defaultMovie?.overview,
              200
            )}
          </p>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="modelBox">
          <ReactPlayer
            // className="reactplayer"
            height={screenHight}
            width={screenWidth}
            // height="30vh"
            // width="40vh"
            url={videoURL}
            controls={true}
          ></ReactPlayer>
        </Box>
      </Modal>
    </div>
  );
};

export default Main;
