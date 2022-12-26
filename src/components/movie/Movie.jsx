import React from "react";

const Movie = ({ item, getRightMovie }) => {
  const shortOverview = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "....";
    } else {
      return str;
    }
  };
  const imgPath = item?.backdrop_path;
  const imgPathTwo = item?.poster_path;

  return (
    <div className="rightbarRow">
      <div
        className="rightbarRowImgHover"
        onMouseOver={() => getRightMovie(item)}
      >
        
        {shortOverview(item?.title ? item?.title : item?.original_name, 19)}
      </div>
      <img
        className="rightbarRowImg"
        src={`https://image.tmdb.org/t/p/w500/${imgPath ?? imgPathTwo}`}
        alt={item?.title}
      />
    </div>
  );
};

export default Movie;
