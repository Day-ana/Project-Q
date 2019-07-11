import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  //Set Default location/text for testing
  state = {
    text: "Oakland",
    within: 10
  };
  static propTypes = {
    clearEvents: PropTypes.func.isRequired,
    searchEvents: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter a Location", "light");
    } else {
      this.props.searchEvents(this.state.text, this.state.within);
      // this.setState({ text: "" });
    }
  };

  onSelect = e => {
    e.preventDefault();
    this.setState({ within: e.target.value });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { showClear, clearEvents } = this.props;

    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <div className="search-container">
            <div className="top">
              <input
                type="text"
                name="text"
                placeholder="Enter a location..."
                value={this.state.text}
                onChange={this.onChange}
              />
            </div>
            <input
              type="submit"
              value="search"
              className="btn btn-dark btn-block"
            />
            <div className="bottom">
              <label>Within miles:</label>
              <select onChange={this.onSelect} value={this.state.within}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
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
  }
}

export default Search;
