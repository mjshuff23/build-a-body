export const TOKEN_KEY = "build-a-body/authentication/token";
export const SET_TOKEN = "build-a-body/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "build-a-body/authentication/REMOVE_TOKEN";
export const ADD_USER = 'build-a-body/authentication/ADD_USER';

export const addUser = (username) => ({ type: ADD_USER, username });
export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        const userId = window.localStorage.getItem('userId');
        dispatch(setToken(token));
        const response = await fetch(`api/users/${userId}`);
        if (response.ok) {
            const { username } = await response.json();
            dispatch(addUser(username));
        }

    }
};

export const login = (email, password) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/users/login`, {
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

export const logout = () => async (dispatch, getState) => {

    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem('userId');
    dispatch(removeToken);
    window.location.href = '/';
    // const {
    //   authentication: { token },
    // } = getState();
    // const response = await fetch(`${baseUrl}/users/logout`, {
    //   method: "delete",
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // if (response.ok) {
    //   window.localStorage.removeItem(TOKEN_KEY);
    //   dispatch(removeToken());
    // }
};

export const register = (username, email, password) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/users`, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
    if (response.ok) {

        const { token, user } = await response.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem('userId', user.id);
        dispatch(setToken(token));
    }
};
