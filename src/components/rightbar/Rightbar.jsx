import React from "react";
import Movie from "../movie/Movie";
import "./rightbar.css";

const Rightbar = ({ movies, getRightbarMovie }) => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="slide">
          {movies.map((item, id) => {
            return (
              <Movie
                item={item}
                key={id}
                getRightMovie={getRightbarMovie}
              ></Movie>
            );
          })}
        </div>
        /
      </div>
    </div>
  );
};

export default Rightbar;
