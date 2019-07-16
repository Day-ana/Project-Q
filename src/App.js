import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SearchEvents from "./components/events/SearchEvents";
import Events from "./components/events/Events";
import Event from "./components/events/Event";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [within, setWithin] = useState(null);
  const [keyword, setKeyword] = useState("queer");

  const searchEvents = async (location, within, keyword) => {
    setLoading(true);
    console.log(location, within, keyword);
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&location.address=${location}&sort_by=date&location.within=${within}mi&token=${
        process.env.REACT_APP_EVENTBRITE_CLIENT_ID
      }`
    );
    setEvents(res.data);
    setLoading(false);
  };

  // searchMeetups = async (location, within, keyword) => {
  //   setLoading(true);
  //   console.log(location, within, keyword);
  //   const res = await axios.get(
  //     `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&location.address=${location}&sort_by=date&location.within=${within}mi&token=${
  //       process.env.REACT_APP_EVENTBRITE_CLIENT_ID
  //     }`
  //   );
  //   this.setState({ events: res.data, loading: false });
  // };

  const getEvent = async id => {
    setLoading(true);
    const res = await axios.get(
      `https://www.eventbriteapi.com/v3/events/${id}/?token=${
        process.env.REACT_APP_EVENTBRITE_CLIENT_ID
      }`
    );
    setEvent(res.data);
    setLoading(false);
  };

  const clearEvents = () => {
    setEvents([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    //Remove Alert box after it's been rendered for 5s
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <Router>
      <div className="App bg-image">
        <Navbar title="ueeery" icon="fas fa-search" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <SearchEvents
                    searchEvents={searchEvents}
                    clearEvents={clearEvents}
                    showClear={events.length > 0 ? true : false}
                    setAlert={showAlert}
                    onSelect={setWithin}
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
                  getEvent={getEvent}
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
};
export default App;
