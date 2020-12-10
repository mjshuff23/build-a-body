import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { backendUrl } from '../config';
import { removeWorkout } from '../store/actions/workouts';
import { Popover } from '@material-ui/core';
import WorkoutForm from './WorkoutForm';

function Workouts() {
    const workoutState = useSelector(state => state.workouts);
    const exercisesState = useSelector(state => state.exercises);
    const workouts = Object.values(workoutState.list);
    const userId = localStorage.getItem("userId");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();

    const handleDelete = async (workoutId) => {
        async function deleteWorkout(workoutId) {
            const response = await fetch(`${backendUrl}/api/workouts/${workoutId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) return true;

            console.log(`Error trying to delete exercise ${workoutId}`);
        }
        const deleted = await deleteWorkout(workoutId);
        if (deleted) {
            dispatch(removeWorkout(workoutId));
        }
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className='workouts'>
            <div className="addWorkoutIcon" onClick={ handleClick }>Add A New Workout<AddIcon style={ { fontSize: 40 } } /></div>
            <Popover
                open={ open }
                anchorEl={ anchorEl }
                onClose={ handleClose }
                anchorOrigin={ {
                    vertical: 'top',
                    horizontal: 'left',
                } }
                transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'left',
                } }
            >
                <WorkoutForm />
            </Popover>
            {workouts ?
                workouts.map((workout, index) => {
                    return (
                        <React.Fragment key={ index } >
                            <br></br>
                            <div className="workout__info">
                                { workout.title } - { workout.type }
                                { Number(userId) === workout.user_id ?
                                    <DeleteIcon onClick={ () => {
                                        handleDelete(workout.id);
                                    } } />
                                    : null }
                            </div>
                            <div>{ workout.description }</div>
                            <ul>
                                { workout.WorkoutExercises ? workout.WorkoutExercises.map((exercise, index) => (
                                    <div key={ index }>{ exercisesState.list[exercise.exercise_id] ?
                                        <>
                                            <li>{ exercisesState.list[exercise.exercise_id].title } - { exercisesState.list[exercise.exercise_id].type }</li>
                                            <div></div>
                                        </>

                                        : null }</div>
                                )) : null }
                            </ul>
                            <hr></hr>
                        </React.Fragment>
                    );
                })
                : null }
        </div>
    );
}

export default Workouts;
