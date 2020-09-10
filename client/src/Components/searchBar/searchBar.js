import React, { useState } from "react";
import { ReactComponent as SearchLogo } from "./../../assets/Search.svg";
import "./searchBar.css";
import { Button } from "rsuite";

function SearchBar(props) {
  const [searchQuery, setsearchQuery] = useState("");
  const { handleSearch } = props;

  const handleChange = (e) => {
    setsearchQuery(e.target.value);
  };

  const handleSubmit = () => {
    handleSearch(searchQuery);
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
      <Button className="search-btn" onClick={handleSubmit}>
        <SearchLogo />
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
