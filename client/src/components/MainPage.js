import React, { useEffect } from 'react';
import './stylesheets/MainPage.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import SideBar from './SideBar';
import Exercises from './Exercises';
import NavBar from './NavBar';
function MainPage() {

    useEffect(() => {
        // TODO: Load Exercises and Workouts
    }, []);


    return (
        <div className="mainPage">
            <Router>
                {/* <SideBar /> */ }
                <Switch>
                    <NavBar />
                    <Route exact path='/' />
                    <Route exact path='/exercises' component={ Exercises } />
                </Switch>
                {/* Workouts */ }
                {/* Footer */ }
            </Router>


        </div>
    );
}

export default MainPage;
