import React, { useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ handleEnter, searchMoviefn, setSearch, search }) => {
  const [dateState, setDateState] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    setInterval(() => setDateState(new Date().toLocaleTimeString()), 1000);
  }, []);

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navbarLeft">
          <div className="navLogo">CINEMA+</div>
          <div className="navTime">{dateState}</div>
        </div>
        <div className="navbarRight">
          <div className="navSearch">
            <input
              type="text"
              className="navSearchInput"
              placeholder="Enter movie name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleEnter}
            />
            <SearchIcon
              onClick={() => searchMoviefn()}
              style={{ color: "white", cursor: "pointer" }}
            ></SearchIcon>
          </div>
          <div className="navProfile">
            <img
              src="https://images.pexels.com/photos/5358943/pexels-photo-5358943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="beautifulgirl"
              className="navProfileImg"
            />
          </div>
          <div className="navLogout">Exit</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
