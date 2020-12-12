import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './stylesheets/Exercises.css';
import ReactPlayer from 'react-player/youtube';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { backendUrl } from '../config';
import { addRating, removeExercise, updateRating } from '../store/actions/exercises';
import { Popover } from '@material-ui/core';
import ExerciseForm from './ExerciseForm';
import ExerciseFormEdit from './ExerciseFormEdit';
import EditIcon from '@material-ui/icons/Edit';
import ReactStars from 'react-stars';
import Comment from './Comment';


function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("build-a-body/authentication/token");
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElEdit, setAnchorElEdit] = useState(null);
    const [currentExerciseId, setCurrentExerciseId] = useState('');

    const dispatch = useDispatch();

    const ratingChanged = async (score, exercise) => {
        // Check if user has already voted on this exercise
        for (let i = 0; i < exercise.voterIds.length; i++) {
            let vote = exercise.voterIds[i];
            if (Number(userId) === vote[0]) {
                // Voter has voted, so we need to do a PUT and update
                const response = await fetch(`${backendUrl}/api/exercises/${exercise.id}/ratings`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ score, userId })
                });

                if (response.ok) {
                    const { rating, oldScore } = await response.json();
                    dispatch(updateRating(exercise.id, rating, userId, oldScore));
                    return true;
                }
            }
        }

        // If never rated, add rating
        const response = await fetch(`${backendUrl}/api/exercises/${exercise.id}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score, userId })
        });

        if (response.ok) {
            const rating = await response.json();
            console.log('Successfully added rating');
            // Push userId to exercise so we get a re-render
            dispatch(addRating(exercise.id, rating, userId));
            return true;
        }
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

    const mapRatings = (exercise) => {
        for (let i = 0; i < exercise.voterIds.length; i++) {
            let vote = exercise.voterIds[i];
            if (Number(userId) === vote[0]) {
                return (
                    <React.Fragment key={ i }>
                        <ReactStars
                            count={ 5 }
                            value={ vote[1] }
                            onChange={ (rating) => {
                                ratingChanged(rating, exercise);
                            } }
                            size={ 24 }
                            color2={ '#ffd700' } />
                        💪💪💪Thanks for rating!💪💪💪
                    </React.Fragment>
                );
            }
        }
        return (
            <React.Fragment key={ Math.random() }>
                <ReactStars
                    count={ 5 }
                    value={ 0 }
                    onChange={ (rating) => {
                        ratingChanged(rating, exercise);
                    } }
                    size={ 24 }
                    color2={ '#ffd700' } />
                Rate this exercise!
            </React.Fragment>
        );
    };

    const open = Boolean(anchorEl);
    const openEdit = Boolean(anchorElEdit);


    return (
        <div className="exercises">
            <div className="addExerciseIcon" onClick={ handleClick }>
                Add A New Exercise <AddIcon style={ { fontSize: 40 } } />
            </div>
            <Popover
                open={ open }
                anchorEl={ anchorEl }
                onClose={ handleClose }
                anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                transformOrigin={ { vertical: 'top', horizontal: 'left' } }>
                <ExerciseForm />
            </Popover>

            {
                exercises ? exercises.map((exercise, index) => {
                    let descriptionSteps;
                    if (exercise.description) {
                        descriptionSteps = exercise.description.split(`\n`);
                    }
                    return (
                        <React.Fragment key={ index }>
                            <div className="exercise__info">
                                {
                                    exercise.voterIds && exercise.voterIds.length ? (
                                        mapRatings(exercise)
                                    ) : (
                                            <React.Fragment key={ index }>
                                                <ReactStars
                                                    count={ 5 }
                                                    value={ 0 }
                                                    onChange={ (rating) => {
                                                        ratingChanged(rating, exercise);
                                                    } }
                                                    size={ 24 }
                                                    color2={ '#ffd700' } />
                                                Rate this exercise!
                                            </React.Fragment>
                                        )
                                }
                                <div className="exercise__ratings">
                                    <span className="exercise__stars">
                                        <ReactStars
                                            count={ 5 }
                                            value={ exercise.averageRating }
                                            size={ 24 }
                                            edit={ false }
                                            color2={ '#ffd700' } />
                                        ({ exercise.ratingCount })
                                    </span>
                                    <span className="exercise__owner">
                                        {
                                            Number(userId) === exercise.user_id ?
                                                <>
                                                    <DeleteIcon onClick={ () => {
                                                        handleDelete(exercise.id);
                                                    } } /> <EditIcon value={ exercise.id } onClick={ (e) => {
                                                        handleClickEdit(e, exercise.id);
                                                    }
                                                    } />
                                                </>
                                                : null
                                        }
                                    </span>
                                </div>
                                <div>
                                    <span className="exercise__title">
                                        { exercise.title } - { exercise.type }
                                    </span>
                                </div>
                                <Popover
                                    open={ openEdit }
                                    anchorEl={ anchorElEdit }
                                    onClose={ handleCloseEdit }
                                    anchorOrigin={ { vertical: 'top', horizontal: 'left' } }
                                    transformOrigin={ { vertical: 'top', horizontal: 'left' } }>
                                    <ExerciseFormEdit exerciseId={ currentExerciseId } />
                                </Popover>
                                <div>
                                    <span className="exercise__difficulty">
                                        Difficulty:
                                    </span>
                                    { exercise.difficulty }
                                </div>
                                <div>
                                    <span className="exercise__equipment">
                                        Equipment:
                                    </span>
                                    { exercise.equipment }
                                </div>
                            </div>
                            <div className="exercise__steps">
                                { descriptionSteps.map((step, index) => (
                                    <div key={ index } className="exercise__step">
                                        <span className="exercise__stepNumber">
                                            { index + 1 }.
                                        </span>
                                        { step }
                                    </div>
                                )) }
                            </div>
                            <div>
                                <ReactPlayer className="exercise__video" url={ exercise.video_url } controls={ true } />
                            </div>
                            <div className="exercise__comments">
                                <span className="exercise__commentsHeader">
                                    Comments
                                </span>
                                {/* Map Through Comments */ }
                                {
                                    exercise.Comments ?
                                        exercise.Comments.map((comment) => {
                                            {
                                                if (comment.User.username)
                                                    return (<Comment author={ comment.User.username } content={ comment.content } date={ comment.createdAt } />);
                                            }
                                        })
                                        : null
                                }
                            </div>
                            <span className="exercise__end"></span>
                        </React.Fragment >
                    );
                }) : null
            }
        </div>
    );
}

export default Exercises;
