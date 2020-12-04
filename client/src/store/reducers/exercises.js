import { SET_EXERCISES, ADD_EXERCISE, REMOVE_EXERCISE, SET_CURRENT_BODY_PART } from '../actions/exercises';

const initialState = {
    list: {},
    ids: [],
    bodyParts: [],
    currentBodyPart: '',
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_EXERCISES:
            newState.list = { ...action.exerciseObject };
            newState.bodyParts = [...action.bodyPartsArray];
            newState.ids = Object.keys(newState.list);
            return newState;
        case SET_CURRENT_BODY_PART:
            newState.currentBodyPart = action.bodyPart;
            return newState;
        case ADD_EXERCISE:
            newState.list[action.exercise.id] = action.exercise;
            newState.ids.push(action.exercise.id);
            return newState;
        case REMOVE_EXERCISE:
            delete newState.list[action.exerciseId];
            newState.ids = newState.ids.filter(id => id !== action.exerciseId);
        default:
            return state;
    }
}
