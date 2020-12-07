import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../store/actions/authentication";
import './stylesheets/LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState("demo@example.com");
    const [password, setPassword] = useState("password");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="loginForm">
            <h2 className='loginForm__header'>Login</h2>
            <br></br>
            <form className="loginForm__form" onSubmit={ handleSubmit }>
                <input
                    className="loginForm__input"
                    type="text"
                    placeholder="Email"
                    value={ email }
                    onChange={ updateEmail }
                />
                <br></br>
                <input
                    className="loginForm__input"
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ updatePassword }
                />
                <br></br>
                <button className="loginForm__button" type="submit">Login</button>
            </form>
            <NavLink to="/landing" className="loginForm__signupLink">No Account? Sign Up Here!</NavLink>
        </div>
    );
};

export default LoginForm;
