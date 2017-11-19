import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Image from 'react-bootstrap/lib/Image'
import logo from './images/logo-white.png'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import LoginCreateAccount from './LoginCreateAccount.js';
import SavedActivities from './SavedActivities.js';
import Settings from './Settings.js';
import Homepage from './Homepage.js';


const LINKS = [
    { to: './SavedActivities.js', title: 'SAVED_ACTIVITIES'},
];

const propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    navbar: {
        backgroundColor: '#2C3E50',
        height: '75px',
        border: 'none',
    },
    navbarContent: {
        marginTop: '12.5px',
    },
    logoLink: {
        marginTop: '8px',
    }
}

class NavigationBar extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Navbar inverse collapseOnSelect className={classes.navbar}>
                    <Navbar.Header>
                      <Navbar.Brand>
                          <a className={classes.logoLink} href="#">
                              <img className={classes.logo} src={logo} height="30px" alt="user pic" />
                          </a>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse className={classes.navbarContent}>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title="User" id="basic-nav-dropdown">
                                <Link to="/Homepage">Homepage</Link>
                                <Link to="/SavedActivities">SavedActivities</Link>
                                <Link to="/Settings">Settings</Link>
                                <MenuItem divider />
                                <Link to="/LoginCreateAccount">Log Out</Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
};

NavigationBar.propTypes = propTypes;
export default injectSheet(styles)(NavigationBar);
