import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Event = ({ event, loading, getEvent, match }) => {
  useEffect(() => {
    getEvent(match.params.id);
    //mimic componentDidMount with empty brackets[]
    //eslint-disable-next-line
  }, []);

  const { logo, url, id, name, locale, is_free, description } = event;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      {name && <h2 style={{ marginBottom: "40px" }}>{name.text}</h2>}
      <Link to="/" className="btn btn-dark">
        Back
      </Link>
      Free:{" "}
      {is_free ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="grid-2">
        <div className="card">
          {logo && (
            <img src={logo.original.url} alt="" style={{ width: "460px" }} />
          )}

          {url && (
            <a
              href={url}
              target="_blank"
              className="btn btn-dark"
              rel="noopener noreferrer"
            >
              Tickets
            </a>
          )}
        </div>
        <div className="grid-2">
          {description && <p style={{ width: "400px" }}>{description.text}</p>}
        </div>
      </div>{" "}
    </Fragment>
  );
};
Event.propTypes = {
  loading: PropTypes.bool,
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired
};

export default Event;
