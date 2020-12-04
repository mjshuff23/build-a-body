export const SET_WORKOUTS = "build-a-body/exercises/SET_WORKOUTS";
export const ADD_WORKOUT = 'build-a-body/exercises/ADD_WORKOUT';
export const REMOVE_WORKOUT = "build-a-body/exercises/REMOVE_WORKOUT";
export const SET_CURRENT_WORKOUT = "build-a-body/exercises/CURRENT_WORKOUT";

export const setWorkouts = (workoutsObject) => ({ type: SET_WORKOUTS, workoutsObject });
export const addWorkout = (workout) => ({ type: ADD_WORKOUT, workout });
export const removeWorkout = (workoutId) => ({ type: REMOVE_WORKOUT, workoutId });
export const setCurrentWorkout = (workoutId) => ({ type: SET_CURRENT_WORKOUT, workoutId });
