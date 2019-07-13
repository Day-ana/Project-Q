import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SearchEvents from "./components/events/SearchEvents";
import Events from "./components/events/Events";
import Event from "./components/events/Event";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    loading: false,
    alert: null,
    events: [],
    event: {},
    within: null,
    keyword: "queer"
  };

  searchEvents = async (location, within, keyword) => {
    this.setState({ loading: true });
    console.log(location, within, keyword);
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&location.address=${location}&sort_by=date&location.within=${within}mi&token=${
        process.env.REACT_APP_EVENTBRITE_CLIENT_ID
      }`
    );
    this.setState({ events: res.data, loading: false });
  };

  getEvent = async id => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/${id}/?token=${
        process.env.REACT_APP_EVENTBRITE_CLIENT_ID
      }`
    );
    this.setState({ event: res.data, loading: false });
  };

  clearEvents = () => this.setState({ events: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    //Remove Alert box after it's been rendered for 5s
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { events, event, loading } = this.state;

    return (
      <Router>
        <div className="App bg-image">
          <Navbar title="ueeery" icon="fas fa-search" />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <SearchEvents
                      searchEvents={this.searchEvents}
                      clearEvents={this.clearEvents}
                      showClear={events.length > 0 ? true : false}
                      setAlert={this.setAlert}
                      onSelect={this.updateMilesWithin}
                    />
                    <Events loading={loading} {...props} events={events} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/event/:id"
                render={props => (
                  <Event
                    {...props}
                    getEvent={this.getEvent}
                    event={event}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
