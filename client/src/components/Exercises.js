import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Exercises.css';
import ReactPlayer from 'react-player/youtube';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { backendUrl } from '../config';
import { removeExercise } from '../store/actions/exercises';
import { Popover } from '@material-ui/core';
import ExerciseForm from './ExerciseForm';
import ExerciseFormEdit from './ExerciseFormEdit';
import EditIcon from '@material-ui/icons/Edit';
import ReactStars from 'react-stars';

function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    const userId = localStorage.getItem("userId");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEdit, setAnchorElEdit] = useState(null);
    const [currentExerciseId, setCurrentExerciseId] = useState('');

    const dispatch = useDispatch();

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const handleDelete = async (exerciseId) => {
        async function deleteExercise(exerciseId) {
            const response = await fetch(`${backendUrl}/api/exercises/${exerciseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) return true;

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

    const handleClickEdit = (e, exerciseId) => {
        setAnchorElEdit(e.currentTarget);
        setCurrentExerciseId(exerciseId);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseEdit = () => {
        setAnchorElEdit(null);
    };

    const open = Boolean(anchorEl);
    const openEdit = Boolean(anchorElEdit);
    return (
        <div className="exercises">

            <div className="addExerciseIcon" onClick={ handleClick }>Add A New Exercise<AddIcon style={ { fontSize: 40 } } /></div>
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
                exercises.map((exercise, index) => {
                    let descriptionSteps;
                    if (exercise.description) {
                        descriptionSteps = exercise.description.split(`\n`);
                    }
                    return (
                        <React.Fragment key={ index }>
                            <div className="exercise__info">
                                <div className="exercise__ratings">
                                    <span className="exercise__stars">
                                        <ReactStars
                                            count={ 5 }
                                            onChange={ ratingChanged }
                                            value={ exercise.averageRating }
                                            size={ 24 }
                                            color2={ '#ffd700' } />
                                        ({ exercise.ratingCount })
                                    </span>
                                    <span className="exercise__owner">
                                        { Number(userId) === exercise.user_id ?
                                            <>
                                                <DeleteIcon onClick={ () => {
                                                    handleDelete(exercise.id);
                                                } } /> <EditIcon value={ exercise.id } onClick={ (e) => {
                                                    handleClickEdit(e, exercise.id);
                                                }
                                                } />
                                            </>
                                            : null }
                                    </span>
                                </div>
                                <div><span className="exercise__title">{ exercise.title } - { exercise.type }</span>
                                </div>
                                <Popover
                                    open={ openEdit }
                                    anchorEl={ anchorElEdit }
                                    onClose={ handleCloseEdit }
                                    anchorOrigin={ {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    } }
                                    transformOrigin={ {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    } }
                                >
                                    <ExerciseFormEdit exerciseId={ currentExerciseId } />
                                </Popover>
                                <div><span className="exercise__difficulty" >Difficulty:</span> { exercise.difficulty }</div>
                                <div><span className="exercise__equipment">Equipment:</span> { exercise.equipment }</div></div>
                            <div className="exercise__steps">
                                { descriptionSteps.map((step, index) => (
                                    <div key={ index } className="exercise__step"><span className="exercise__stepNumber">{ index + 1 }. </span>{ step }</div>
                                )) }
                            </div>
                            <div><ReactPlayer className="exercise__video" url={ exercise.video_url } controls={ true } /></div>
                            <span className="exercise__end"></span>
                        </React.Fragment >
                    );
                })
                : null }
        </div>
    );
}

export default Exercises;
