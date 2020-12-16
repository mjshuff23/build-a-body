import {
    SET_EXERCISES,
    ADD_EXERCISE,
    REMOVE_EXERCISE,
    SET_CURRENT_BODY_PART,
    ADD_RATING,
    ADD_COMMENT,
    UPDATE_COMMENT,
    UPDATE_RATING,
    REMOVE_COMMENT,
    ADD_LIKED_EXERCISE,
    REMOVE_LIKED_EXERCISE
} from '../actions/exercises';

const initialState = {
    list: {},
    ids: [],
    bodyParts: [],
    currentBodyPart: '',
};

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    let comments;
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
            for (let i = 0; i < newState.list[action.exerciseId].Ratings.length; i++) {
                // If current rating is the rating we updated, replace it
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

        case ADD_COMMENT:
            newState.list[action.comment.commentableId].Comments.unshift(action.comment);
            return newState;

        case UPDATE_COMMENT:
            // Find comment
            comments = newState.list[action.updatedComment.commentableId].Comments;
            for (let i = 0; i < comments.length; i++) {
                // If current comments id is the one we just updated
                if (comments[i].id === action.updatedComment.id) {
                    comments[i] = action.updatedComment;
                    break;
                }
            }
            return newState;

        case REMOVE_COMMENT:
            // Find comment
            comments = newState.list[action.exerciseId].Comments;
            newState.list[action.exerciseId].Comments = comments.filter(comment => {
                return comment.id !== action.commentId;
            });
            return newState;

        case ADD_LIKED_EXERCISE:
            // Add Liked Row to Exercise
            console.log(action.likedExercise.likedId);
            newState.list[action.likedExercise.likedId].Likeds.push(action.likedExercise);
            return newState;

        case REMOVE_LIKED_EXERCISE:
            // Find liked row
            let exerciseLikeds = newState.list[action.likedExerciseId].Likeds;
            newState.list[action.likedExerciseId].Likeds = exerciseLikeds.filter(like => {
                return (like.user_id !== action.userId) && (like.likedId !== action.likedExerciseId);
            });

            return newState;
        default:
            return state;
    }
}
