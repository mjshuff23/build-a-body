import { backendUrl } from "../../config";
export const TOKEN_KEY = "build-a-body/authentication/token";
export const SET_TOKEN = "build-a-body/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "build-a-body/authentication/REMOVE_TOKEN";
export const ADD_USER = 'build-a-body/authentication/ADD_USER';

export const addUser = (user) => ({ type: ADD_USER, user });
export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        const userId = window.localStorage.getItem('userId');
        dispatch(setToken(token));
        const response = await fetch(`${backendUrl}/api/users/${userId}`);
        if (response.ok) {
            const user = await response.json();
            dispatch(addUser(user));
        }

    }
};

export const login = (email, password) => async (dispatch) => {
    const response = await fetch(`${backendUrl}/api/users/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const { token, user } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem('userId', user.id);
        dispatch(setToken(token));
    }
};

export const logout = () => async (dispatch) => {

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem('userId');
    dispatch(removeToken);
    window.location.href = '/';
};

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
    const response = await fetch(`api/users`, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword })
    });
    if (response.ok) {

        const { token, user } = await response.json();
        console.log(user);
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem('userId', user.id);
        dispatch(setToken(token));
    }
};
