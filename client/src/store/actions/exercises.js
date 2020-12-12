export const SET_EXERCISES = "build-a-body/exercises/SET_EXERCISES";
export const ADD_EXERCISE = 'build-a-body/exercises/ADD_EXERCISE';
export const REMOVE_EXERCISE = "build-a-body/exercises/REMOVE_EXERCISE";
export const ADD_RATING = "build-a-body/exercises/ADD_RATING";
export const ADD_COMMENT = "build-a-body/exercises/ADD_COMENT";
export const UPDATE_COMMENT = "build-a-body/exercises/UPDATE_COMMENT";
export const UPDATE_RATING = "build-a-body/exercises/UPDATE_RATING";
export const SET_CURRENT_BODY_PART = "build-a-body/exercises/CURRENT_BODY_PART";
export const REMOVE_COMMENT = "build-a-body/exercises/REMOVE_COMMENT";

export const setExercises = (exerciseObject, bodyPartsArray) => ({ type: SET_EXERCISES, exerciseObject, bodyPartsArray });
export const addExercise = (exercise) => ({ type: ADD_EXERCISE, exercise });
export const removeExercise = (exerciseId) => ({ type: REMOVE_EXERCISE, exerciseId });

export const setCurrentExerciseGroup = (bodyPart) => ({ type: SET_CURRENT_BODY_PART, bodyPart });

export const addRating = (exerciseId, rating, userId) => ({ type: ADD_RATING, exerciseId, rating, userId });
export const updateRating = (exerciseId, rating, userId, oldScore) => ({ type: UPDATE_RATING, exerciseId, rating, userId, oldScore });

export const addComment = (comment) => ({ type: ADD_COMMENT, comment });
export const updateComment = (updatedComment, exerciseId) => ({ type: UPDATE_COMMENT, updatedComment, exerciseId });
export const removeComment = (commentId, exerciseId) => ({ type: REMOVE_COMMENT, commentId, exerciseId });
