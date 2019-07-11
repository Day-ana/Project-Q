import React, { Component } from "react";
import EventItem from "./EventItem";
import Spinner from "../layout/Spinner";

export class Events extends Component {
  render() {
    const { events, loading } = this.props;

    const eventstyle = {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridGap: "1rem",
      border: "1px solid rgb(255, 1, 151)",
      padding: "20px 30px",
      transition: "background 200ms",
      boxShadow: "-1px -3px 19px #ff019740",
      borderRadius: "5px"
    };

    if (loading) {
      return <Spinner />;
    }
    if (events.length !== 0) {
      return (
        <div style={eventstyle}>
          {events.events.map(event => (
            <EventItem event={event} key={event.id} />
          ))}
        </div>
      );
    } else {
      return (
        <div style={eventstyle}>
          <h2>Please enter a location....</h2>
        </div>
      );
    }
  }
}

export default Events;
