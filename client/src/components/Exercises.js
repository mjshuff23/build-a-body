import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Exercises.css';
import { Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { backendUrl } from '../config';
import { removeExercise } from '../store/actions/exercises';

function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();

    const handleDelete = async (exerciseId) => {
        async function deleteExercise(exerciseId) {
            const response = await fetch(`${backendUrl}/api/exercises/${exerciseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                return true;
            }

            console.log(`Error trying to delete exercise ${exerciseId}`);
        }
        const deleted = await deleteExercise(exerciseId);

        if (deleted) {
            dispatch(removeExercise(exerciseId));
        }

    };

    return (
        <div className="exercises">
            {/* <div className="filter">
                { exerciseState.bodyParts ?
                    exerciseState.bodyParts.map(bodyPart => (
                        <>
                            { bodyPart } <Checkbox
                                value={ bodyPart }
                                inputProps={ { 'aria-label': `${bodyPart}` } }
                            />
                        </>
                    ))
                    : null }
            </div> */}
            <div className="addExerciseIcon">Add A New Exercise<AddIcon style={ { fontSize: 40 } } /></div>
            {exercises ?
                exercises.map(exercise => {
                    let descriptionSteps;
                    if (exercise.description) {
                        descriptionSteps = exercise.description.split(`\n`);
                    }
                    return (
                        <>
                            <br></br>
                            <div>{ exercise.title } - { exercise.type }
                                { userId == exercise.user_id ?
                                    <DeleteIcon onClick={ () => {
                                        handleDelete(exercise.id);
                                    } } />
                                    : null }</div>
                            <div>Difficulty: { exercise.difficulty }</div>
                            <div>Equipment: { exercise.equipment }</div>
                            <br></br>
                            {descriptionSteps.map(step => (
                                <div>{ step }</div>
                            )) }
                            <hr></hr>
                        </>
                    );
                })
                : null }
        </div>
    );
}

export default Exercises;
