import React from 'react';
import { useSelector } from 'react-redux';

function User(props) {
    const userState = useSelector(state => state.authentication);
    return (
        <>
            <strong>Username:</strong> {userState.user.username }<br />
            <strong>Email:</strong> {userState.user.email }<br />
            <hr />
        </>
    );
}
export default User;
