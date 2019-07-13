import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class EventItem extends Component {
  render() {
    const { name, description, start, logo, id, url } = this.props.event;
    const date = new Date(start.local).toDateString();

    // console.log(this.props.event);

    let defaultImg = "https://picsum.photos/200/200/?random";
    let imgUrl = logo;
    if (imgUrl !== null) {
      imgUrl = imgUrl.url;
    } else {
      imgUrl = defaultImg;
    }

    return (
      <div className="card text-center">
        <img src={imgUrl} alt="" style={{ width: "100%" }} />
        <h3 style={{ margin: "10px" }}>{name.text}</h3>
        <h4>{date}</h4>
        <Link to={`/event/${id}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          n
          className="btn btn-light btn-sm my-1"
        >
          Tickets
        </a>
      </div>
    );
  }
}

export default EventItem;
