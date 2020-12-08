import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { backendUrl } from '../config';
import { removeWorkout } from '../store/actions/workouts';

function Workouts() {
    const workoutState = useSelector(state => state.workouts);
    const exercisesState = useSelector(state => state.exercises);
    const workouts = Object.values(workoutState.list);
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();

    const handleDelete = async (workoutId) => {

        async function deleteWorkout(workoutId) {
            const response = await fetch(`${backendUrl}/api/workouts/${workoutId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                return true;
            }

            console.log(`Error trying to delete exercise ${workoutId}`);
        }
        const deleted = await deleteWorkout(workoutId);

        if (deleted) {
            dispatch(removeWorkout(workoutId));
        }
    };


    return (
        <div className='workouts'>
            {workouts ?
                workouts.map(workout => {
                    return (
                        <>
                            <br></br>
                            <div>{ workout.title } - { workout.type }</div>
                            { userId == workout.user_id ?
                                <DeleteIcon onClick={ () => {
                                    handleDelete(workout.id);
                                } } />
                                : null }
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
                            <hr></hr>
                        </>
                    );
                })
                : null }
        </div>
    );
}

export default Workouts;
