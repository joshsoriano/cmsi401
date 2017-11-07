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


const propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = {
    logoLink: {
        marginLeft: '-10px',
    },
    
    
}

class NavigationBar extends React.Component {
    render() {
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logoLink" href="#">
                            <img className="logo" src={logo} width="150px" alt="user pic" />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Settings</MenuItem>
                            <MenuItem eventKey={3.2}>My Saved Activities</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

NavigationBar.propTypes = propTypes;
export default injectSheet(styles)(NavigationBar);