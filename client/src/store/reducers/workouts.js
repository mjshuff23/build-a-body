import { SET_WORKOUTS, ADD_WORKOUT, REMOVE_WORKOUT, SET_CURRENT_WORKOUT } from '../actions/workouts';

const initialState = {
    list: {},
    ids: [],
    currentWorkout: '',
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_WORKOUTS:
            newState.list = { ...action.workoutsObject };
            newState.ids = Object.keys(newState.list);
            return newState;
        case SET_CURRENT_WORKOUT:
            newState.currentWorkout = action.workoutId;
            return newState;
        case ADD_WORKOUT:
            newState.list[action.workout.id] = action.workout;
            newState.ids.push(action.workout.id);
            return newState;
        case REMOVE_WORKOUT:
            delete newState.list[action.workoutId];
            newState.ids = newState.ids.filter(id => Number(id) !== Number(action.workoutId));
            return newState;
        default:
            return state;
    }
}
