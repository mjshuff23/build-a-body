import React from 'react';
import { Formik } from 'formik';
// used when validating with a self-implemented approach
import * as EmailValidator from 'email-validator';
// used when validating with a pre-built solution
import * as Yup from 'yup';


function ValidatedLoginForm() {
    return (
        <div>
            <h1>Validated Form Component</h1>
            <Formik
                initialValues={ { email: "", password: "" } }
                onSubmit={ (values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log('Logging In');
                        setSubmitting(false);
                    }, 500);
                } }
                validate={ values => {
                    let errors = {};
                    errors.email = "Invalid Email";
                    return errors;
                } }
            >
                { props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;

                    return (
                        <form onSubmit={ handleSubmit }>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="text" placeholder="Enter Your Email" />
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="password" placeholder="Enter Your Password" />
                            <button type="submit" disabled={ isSubmitting }>
                                Login
                            </button>
                        </form>
                    );
                } }
            </Formik>
        </div>
    );
}

export default ValidatedLoginForm;
