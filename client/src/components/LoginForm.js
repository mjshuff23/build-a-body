import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../store/actions/authentication";
import './stylesheets/LoginForm.css';
import * as EmailValidator from 'email-validator';

const LoginForm = () => {
    const [email, setEmail] = useState("demo@example.com");
    const [password, setPassword] = useState("password");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!EmailValidator.validate(email)) {
            return alert("Please Enter a Valid Email");
        }

        const error = await dispatch(login(email, password));
        if (error) {
            return alert(error);
        }
        return <Redirect to="/" />;
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="loginForm">
            <div className="loginForm__container">
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
                    <div className="loginForm__invalidEmail">Invalid Email</div>
                    <input
                        className="loginForm__input"
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ updatePassword }
                    />
                    <div className="loginForm__invalidPassword">Invalid Password</div>
                    <button className="loginForm__button" type="submit">Login</button>
                </form>
                <NavLink to="/signup" className="loginForm__signupLink">No Account? Sign Up Here!</NavLink>
            </div>
        </div>
    );
};

export default LoginForm;
