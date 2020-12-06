import React from 'react';
import { useSelector } from 'react-redux';

function Workouts() {
    const workoutState = useSelector(state => state.workouts);
    const exercisesState = useSelector(state => state.exercises);
    const workouts = Object.values(workoutState.list);
    return (
        <div className='workouts'>
            {workouts ?
                workouts.map(workout => {
                    return (
                        <>
                            <br></br>
                            <div>{ workout.title } - { workout.type }</div>
                            <div>{ workout.description }</div>
                            <ul>
                                { workout.WorkoutExercises.map(exercise => (
                                    <div>{ exercisesState.list[exercise.exercise_id] ?
                                        <>
                                            <li>{ exercisesState.list[exercise.exercise_id].title } - { exercisesState.list[exercise.exercise_id].type }</li>
                                            <div></div>
                                        </>

                                        : null }</div>
                                )) }
                            </ul>
                            <br></br>
                        </>
                    );
                })
                : null }
        </div>
    );
}

export default Workouts;
