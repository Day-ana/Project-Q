import React, { Fragment, Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class Event extends Component {
  componentDidMount() {
    // console.log(this.props.match.params.id);
    this.props.getEvent(this.props.match.params.id);
  }

  static propTypes = {
    loading: PropTypes.bool,
    event: PropTypes.object.isRequired,
    getEvent: PropTypes.func.isRequired
  };
  render() {
    const {
      logo,
      url,
      id,
      name,
      locale,
      is_free,
      description
    } = this.props.event;
    const { loading } = this.props;

    console.log(this.props.event);
    if (loading) return <Spinner />;

    return (
      <Fragment>
        <div className="card grid-2">
          <div className="card grid-2">
            {logo && (
              <img
                src={logo.original.url}
                className="round-img"
                alt=""
                style={{ width: "150px" }}
              />
            )}
            {name && <h2>{name.text}</h2>}
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                Tickets
              </a>
            )}
          </div>
          <div className="card grid-2">
            {description && <p>{description.text}</p>}
          </div>
        </div>{" "}
        <Link to="/" className="btn btn-light">
          Back
        </Link>
        Free:{" "}
        {is_free ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
      </Fragment>
    );
  }
}

export default Event;
