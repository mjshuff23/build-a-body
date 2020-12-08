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
            // Does the body part exist in our body part array? If not, add it
            if (newState.bodyParts.indexOf(action.exercise.body_part) === -1) {
                newState.bodyParts.push(action.exercise.body_part);
            }
            return newState;
        case REMOVE_EXERCISE:
            // Remove from list
            delete newState.list[action.exerciseId];

            // Remove from IDs list
            newState.ids = newState.ids.filter(id => Number(id) !== Number(action.exerciseId));

            // Update Body Parts array
            let newBodyPartsList = new Set();
            for (let listItem in newState.list) {
                console.log(newState.list[listItem]);
                if (newBodyPartsList.has(newState.list[listItem].body_part)) continue;
                newBodyPartsList.add(newState.list[listItem].body_part);
            }
            newState.bodyParts = Array.from(newBodyPartsList);
            return newState;
        default:
            return state;
    }
}
