import {
    SET_EXERCISES,
    ADD_EXERCISE,
    REMOVE_EXERCISE,
    SET_CURRENT_BODY_PART,
    ADD_RATING,
    UPDATE_RATING,
} from '../actions/exercises';

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
            delete newState.list[action.exerciseId];

            newState.ids = newState.ids.filter(id => Number(id) !== Number(action.exerciseId));

            let newBodyPartsList = new Set();
            for (let listItem in newState.list) {
                if (newBodyPartsList.has(newState.list[listItem].body_part)) continue;
                newBodyPartsList.add(newState.list[listItem].body_part);
            }
            newState.bodyParts = Array.from(newBodyPartsList);
            return newState;
        case ADD_RATING:
            // Push rating onto exercise
            newState.list[action.exerciseId].Ratings = [...newState.list[action.exerciseId].Ratings, action.rating];
            // Add user to voterIds of exercise
            newState.list[action.exerciseId].voterIds = [...newState.list[action.exerciseId].voterIds, [Number(action.userId), action.rating.score]];
            // If averageRating is null, set it to 0
            if (!newState.list[action.exerciseId].averageRating) {
                newState.list[action.exerciseId].averageRating = 0;
            }
            // Calculate old total score
            let oldScore = newState.list[action.exerciseId].averageRating * newState.list[action.exerciseId].ratingCount;
            // Increase rating count
            newState.list[action.exerciseId].ratingCount += 1;
            // Add new score to old total score, and divide by new rating count
            newState.list[action.exerciseId].averageRating = (oldScore + action.rating.score) / newState.list[action.exerciseId].ratingCount;
            return newState;
        case UPDATE_RATING:
            let totalScore = 0;
            // Loop through ratings to find the rating we changed
            for (let i = 0; i < newState.list[action.exerciseId].Ratings.length; i++) {
                // If current rating is the rating we updated, replace it
                if (newState.list[action.exerciseId].Ratings[i].user_id === Number(action.userId)) {
                    newState.list[action.exerciseId].Ratings[i] = action.rating;
                }
            }
            // Recalculate Score
            console.log(newState.list[action.exerciseId].Ratings);
            for (let i = 0; i < newState.list[action.exerciseId].Ratings.length; i++) {
                // If current rating is the rating we updated, replace it
                console.log(newState.list[action.exerciseId].Ratings[i].score);
                totalScore += newState.list[action.exerciseId].Ratings[i].score;
            }
            // Update Average Rating, Rating Count remains the same
            newState.list[action.exerciseId].averageRating = totalScore / newState.list[action.exerciseId].ratingCount;
            // Loop through voterIds to find and update the one with the userId
            for (let i = 0; i < newState.list[action.exerciseId].voterIds.length; i++) {
                let [user] = newState.list[action.exerciseId].voterIds[i];
                if (user === Number(action.userId)) {
                    newState.list[action.exerciseId].voterIds[i] = [user, action.rating.score];
                }
            }


            return newState;
        default:
            return state;
    }
}
