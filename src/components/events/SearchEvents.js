import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchEvents = ({ searchEvents, showClear, clearEvents, setAlert }) => {
  //Set Default location/text for testing
  const [text, setText] = useState("Oakland");
  const [within, setWithin] = useState("10");
  const [keyword, setKeyword] = useState("queer");

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a Location", "light");
    } else {
      searchEvents(text, within, keyword);
    }
  };

  const onSelectRange = e => {
    e.preventDefault();
    setWithin(e.target.value);
  };

  const onSelectKeyword = e => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const onChange = e => setText(e.target.value);

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <div className="search-container">
          <div className="top">
            <input
              type="text"
              name="text"
              placeholder="Enter a location..."
              value={text}
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            value="search"
            className="btn btn-dark btn-block"
          />
          <div className="bottom">
            <label>Within miles:</label>
            <select onChange={onSelectRange} value={within}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label>Keyword:</label>
            <select onChange={onSelectKeyword} value={keyword}>
              <option value="queer">Queer</option>
              <option value="lesbian">Lesbian</option>
              <option value="lgbt">LGBT</option>
              <option value="gay">gay</option>
            </select>
          </div>
          {showClear && (
            <button className="btn btn-light btn-block" onClick={clearEvents}>
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
SearchEvents.propTypes = {
  clearEvents: PropTypes.func.isRequired,
  searchEvents: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default SearchEvents;
