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
            {description && (
              <p style={{ width: "400px" }}>{description.text}</p>
            )}
          </div>
        </div>{" "}
      </Fragment>
    );
  }
}

export default Event;
