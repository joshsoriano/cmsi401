import React from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import eventExample from '../images/eventExample.png';
import NavigationBar from './NavigationBar.js';
import logo_offwhite from '../images/logo-offwhite.png';
import { getUserID } from './userID';
import '../styles.css';

const propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    background: {
        textAlign: 'center',
        height: '900px',
        backgroundColor: '#ECF0F1',
    },
    spacer: {
        height: '25%',
    },
};

class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ticketMaster: false,
      eventbrite: false,
      eventful: false,
      called: false // True if the APIs have been called.
     }
  }

  componentDidMount() {
    // find or create user!!!
    this.props.actions.isUpdateNeeded();
  }

  retrieveTicketMaster() {
    // Add TicketMaster activities.
    $.getJSON("https://app.ticketmaster.com/discovery/v2/events.json", {
        countryCode: "US",
        city: "Los Angeles",
        apikey: "uWhf6Zv92eNoIQA4E16MdCe7HC2DSEMS"
    }).done((result) => {
      let activityList = [];
      result._embedded.events.map((event) => {
        let activity = {};

        // Build the activity object.
        activity.name = event.name;
        activity.date = event.dates.start.localDate.replace(/-/g, '');
        activity.location = event._embedded.venues[0].name; // Use the first venue name available.
        activity.link = event.url;
        activity.source = "TicketMaster";
        activity.description = "Click the link for more information.";
        activity.imageUrl = event.images[0].url; // Use the first image available.
        activity.price = event.priceRanges ? event.priceRanges[0].min : 0;

        // Add it to the database.
        this.addActivity(activity);
        this.setState({ ticketMaster: true });
        })
    })
  }

  retrieveEventbrite() {
    // Add Eventbrite activities.
    $.getJSON("https://www.eventbriteapi.com/v3/events/search/?token=WJKCHNMPIP6DBF5S3XQF", {
      "location.address": "Los Angeles, CA",
      "location.within": "10mi"
    }).done((result) => {
      result.events.map((event) => {
        let activity = {};

        // Build the activity object.
        activity.name = event.name.text;
        activity.date = event.start.local.replace(/-/g, '').substring(0, 8);
        // activity.location This API doesn't provide location info.
        activity.link = event.url;
        activity.source = "Eventbrite";
        activity.description = "Click the link for more information.";
        activity.imageUrl = event.logo ? event.logo.url : ""; // In case there isn't a logo.
        activity.price = 0; // This API doesn't provide price either.

        // Add it to the database.
        this.addActivity(activity);
        this.setState({ eventbrite: true });
      })
    });
  }

  retrieveEventful() {
    // Add Eventful activities.
    $.getJSON("http://api.eventful.com/json/events/search?callback=?", {
        app_key: "XgSXTL5TkHCfnxCm",
        location: "Los Angeles, CA",
        date: "Future",
        within: 10,
        units: "mi"
    }).done((result) => {
      result.events.event.map((event) => {
        let activity = {};

        // Build the activity object.
        activity.name = event.title;
        activity.date = event.start_time.replace(/-/g, '').substring(0, 8);
        activity.location = event.venue_name;
        activity.link = event.url;
        activity.source = "Eventful";
        activity.description = event.description;
        activity.imageUrl = event.image ? event.image.medium.url : "";  // In case there isn't an image.
        activity.price = 0; // Not available for this API.

        // Add it to the database.
        this.addActivity(activity);
        this.setState({ eventful: true });
      })
    });
  }

  addActivity(activity) {
    this.props.actions.addActivity(
      activity.name,
      activity.date,
      activity.location,
      activity.imageUrl,
      activity.link,
      activity.price,
      activity.description
    );
  }

  updateDatabase() {
    this.setState({called: true});
    this.retrieveTicketMaster();
    this.retrieveEventbrite();
    this.retrieveEventful();
  }

  render() {
    const { classes } = this.props;
    // is_update_needed is null until the response comes back.
    if ( this.props.is_update_needed != null &&
       (!this.props.is_update_needed || (this.state.ticketMaster && this.state.eventbrite && this.state.eventful)) ) {
      return <Redirect to='/Homepage'/>

    } else if (!this.state.called && this.props.is_update_needed) {
      // We only want to call the APIs once.
      this.updateDatabase();
      return (
        <div className={ classes.background }>
          <div className={ classes.spacer }></div>
          <div className="spinner">
             <div className="cube1"></div>
             <div className="cube2"></div>
           </div>
        </div>
      )

    } else {
      return (
        <div className={ classes.background }>
          <div className={ classes.spacer }></div>
          <div className="spinner">
             <div className="cube1"></div>
             <div className="cube2"></div>
           </div>
        </div>
      )
    }
  }
}

Loading.propTypes = propTypes;
export default injectSheet(styles)(Loading);
