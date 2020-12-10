import React from 'react';
import { useSelector } from 'react-redux';
import './stylesheets/NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { baseUrl } from '../config';
function NavBar() {

    const userState = useSelector(state => state.authentication);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Build-A-Body</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href={ `${baseUrl}/` }>Home</Nav.Link> */ }
                    <Nav.Link href={ `${baseUrl}/` }>Home</Nav.Link>
                    <Nav.Link href={ `${baseUrl}/exercises` }>Exercises</Nav.Link>
                    <Nav.Link href={ `${baseUrl}/workouts` }>Workouts</Nav.Link>
                    <Nav.Link href={ `${baseUrl}/user/` }>{ `${userState.user.email}` }</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default NavBar;
