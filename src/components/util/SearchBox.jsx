/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";

function SearchBox(props) {
  const [key, setKey] = useState("");

  const [anchor, setAnchor] = useState(props.fields[0].field);

  const handleChange = (e) => {
    const { value } = e.target;
    setKey(value);
  };

  const handleSearch = () => {
    props.getSearchResults(anchor, key);
  };

  const setAnchorNew = (event) => {
    setAnchor(event.target.value);
  };

  return (
    <div className="searchBox">
      <select
        id="fields"
        name="searchFields"
        className="searchOptions"
        value={anchor}
        onChange={setAnchorNew}
      >
        {props.fields.map((option, index) => {
          return (
            <option key={index} value={option.field}>
              {option.field}
            </option>
          );
        })}
      </select>
      <input
        name="searchKey"
        type="text"
        placeholder="Search Key"
        id="searchKey"
        value={key}
        onChange={handleChange}
        className="searchInput"
        required
      ></input>
      <button className="searchButton" onClick={handleSearch}>
        Search Results
      </button>
    </div>
  );
}

export default SearchBox;
