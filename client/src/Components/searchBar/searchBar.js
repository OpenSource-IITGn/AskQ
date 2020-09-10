import React, { useState } from "react";
import { ReactComponent as SearchLogo } from "./../../assets/Search.svg";
import "./searchBar.css";
import { Button } from "rsuite";

function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("");
  const handleChange = (e) => {
    setsearchQuery(e.target.value);
  };
  return (
    <div className="search-bar">
      <input
        value={searchQuery}
        onChange={handleChange}
        placeholder="Type to Search"
        type="text"
        className="search-input"
      />
      <div className="placeholder-logo">
        <SearchLogo />
      </div>
      <Button className="search-btn">
        <SearchLogo />
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
