import React from 'react';
import { useSelector } from 'react-redux';

function User(props) {
    const userState = useSelector(state => state.authentication);
    return (
        <div className="userInfo">
            <strong>Username:</strong> {userState.user.username }<br />
            <strong>Email:</strong> {userState.user.email }<br />
            <hr />
        </div>
    );
}
export default User;
