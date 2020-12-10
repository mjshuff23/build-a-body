export const SET_EXERCISES = "build-a-body/exercises/SET_EXERCISES";
export const ADD_EXERCISE = 'build-a-body/exercises/ADD_EXERCISE';
export const REMOVE_EXERCISE = "build-a-body/exercises/REMOVE_EXERCISE";
export const ADD_RATING = "build-a-body/exercises/ADD_RATING";
export const SET_CURRENT_BODY_PART = "build-a-body/exercises/CURRENT_BODY_PART";

export const setExercises = (exerciseObject, bodyPartsArray) => ({ type: SET_EXERCISES, exerciseObject, bodyPartsArray });
export const addExercise = (exercise) => ({ type: ADD_EXERCISE, exercise });
export const removeExercise = (exerciseId) => ({ type: REMOVE_EXERCISE, exerciseId });
export const setCurrentExerciseGroup = (bodyPart) => ({ type: SET_CURRENT_BODY_PART, bodyPart });
export const addRating = (exerciseId, rating, userId) => ({ type: ADD_RATING, exerciseId, rating, userId });
