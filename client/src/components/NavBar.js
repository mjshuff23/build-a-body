import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import { baseUrl } from '../config';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../store/actions/authentication';
function NavBar() {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.authentication);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Build-A-Body</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href={ `${baseUrl}/` }>Home</Nav.Link> */ }
                    <Nav.Link href={ `/` }>Home</Nav.Link>
                    <Nav.Link href={ `/exercises` }>Exercises</Nav.Link>
                    <Nav.Link href={ `/workouts` }>Workouts</Nav.Link>
                    <Nav.Link href={ `/user/` }>{ `${userState.user.email}` }</Nav.Link>
                </Nav>
                <div className="navbar__logoutIcon" onClick={ () => {
                    console.log('click');
                    dispatch(logout());
                } } ><ExitToAppIcon /></div>
            </Navbar.Collapse>
        </Navbar>
    );

}

export default NavBar;
