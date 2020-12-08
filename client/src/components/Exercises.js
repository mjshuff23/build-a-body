import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Exercises.css';
import { Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { backendUrl } from '../config';
import { removeExercise } from '../store/actions/exercises';
import { Popover } from '@material-ui/core';
import ExerciseForm from './ExerciseForm';

function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    const userId = localStorage.getItem("userId");
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="exercises">

            <div className="addExerciseIcon">Add A New Exercise<AddIcon style={ { fontSize: 40 } } onClick={ handleClick } /></div>
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
                <ExerciseForm />
            </Popover>

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
                            <div><a href={ exercise.video_url } target="_blank" style={ { color: 'red' } }>YouTube Video Link</a></div>
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
