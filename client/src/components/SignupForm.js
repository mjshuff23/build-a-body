import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { register } from '../store/actions/authentication';
import './stylesheets/SignupForm.css';

function SignUpForm() {
    const token = useSelector((state) => state.authentication.token);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register(username, email, password, confirmPassword));
    };

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const updateConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    if (token) {
        return <Redirect to="/" />;
    }

    return (
        <div className="signUpForm">
            <h2 className='signUpForm__header'>Sign Up</h2>
            <br></br>
            <form className="signUpForm__form" onSubmit={ handleSubmit }>
                <input
                    className="signUpForm__input"
                    type="text"
                    placeholder="Username"
                    value={ username }
                    onChange={ updateUsername }
                />
                <br></br>
                <input
                    className="signUpForm__input"
                    type="text"
                    placeholder="Email"
                    value={ email }
                    onChange={ updateEmail }
                />
                <br></br>
                <input
                    className="signUpForm__input"
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={ updatePassword }
                />
                <br></br>
                <input
                    className="signUpForm__input"
                    type="password"
                    placeholder="Confirm Password"
                    value={ confirmPassword }
                    onChange={ updateConfirmPassword }
                />
                <br></br>
                <button className="signUpForm__button" type="submit">Sign Up!</button>
            </form>
            <NavLink to='/login' className="signUpForm__loginLink">Already have an account?</NavLink>

        </div>
    );
}

export default SignUpForm;
