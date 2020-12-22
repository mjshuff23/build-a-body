import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from './route-util';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import './components/stylesheets/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from './components/SignupForm';
import ValidatedLoginForm from './components/ValidatedLoginForm';

function App({ needLogin, loadToken }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        loadToken();
    }, [loadToken]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/landing" component={ LandingPage } />
                <Route path="/signup" component={ SignUpForm } />
                <ProtectedRoute
                    path="/login"
                    exact={ true }
                    needLogin={ needLogin }
                    component={ LoginForm }
                />
                <PrivateRoute
                    path="/"
                    needLogin={ needLogin }
                    component={ MainPage }
                />
            </Switch>
        </BrowserRouter>
    );
}


const AppContainer = () => {
    const needLogin = useSelector((state) => !state.authentication.token);
    const dispatch = useDispatch();
    return <App needLogin={ needLogin } loadToken={ () => dispatch(loadToken()) } />;
};

export default AppContainer;
