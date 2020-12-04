import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import authentication from './reducers/authentication';
import exercises from './reducers/exercises';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authentication,
    exercises,
});

const configureStore = (initialState) => {
    return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
