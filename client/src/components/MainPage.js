import React from 'react';
import './stylesheets/MainPage.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
function MainPage() {

    return (
        <div className="mainPage">
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path='/' />
                </Switch>
                {/* Workouts */ }
                {/* Footer */ }
            </Router>


        </div>
    );
}

export default MainPage;
