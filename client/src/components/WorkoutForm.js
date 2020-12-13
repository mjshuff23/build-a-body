import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendUrl } from '../config';
import { addWorkout } from '../store/actions/workouts';

function WorkoutForm({ handleClose }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    let exerciseList = [];
    const exercises = useSelector(state => Object.values(state.exercises.list));

    const token = localStorage.getItem('build-a-body/authentication/token');
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        async function createWorkout() {
            if (!userId || !exerciseList.length) return;
            handleClose();
            const response = await fetch(`${backendUrl}/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, type, user_id: userId, exerciseList })
            });

            if (response.ok) {
                const { newWorkout } = await response.json();
                console.log(newWorkout);

                await setTimeout(async () => {
                    const workoutExercisesFetch = await fetch(`${backendUrl}/api/workouts/${newWorkout.id}/exercises`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (workoutExercisesFetch.ok) {
                        const workoutExercises = await workoutExercisesFetch.json();
                        console.log(workoutExercises);
                        newWorkout.WorkoutExercises = workoutExercises;
                        dispatch(addWorkout(newWorkout));
                    }
                }, 2000);

            }
            // TODO: Dispatch addition of exercise to Redux
        };
        createWorkout();
    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    };

    const addExercise = (e) => {
        if (e.target.value === 'none') return;
        exerciseList.push(e.target.value);
        console.log(exerciseList);
    };


    return (
        <div className="new-form-holder centered middled">
            <form className="newWorkoutForm" onSubmit={ handleSubmit }>
                <input
                    type="text"
                    placeholder="Title"
                    required
                    value={ title }
                    onChange={ updateProperty(setTitle) }
                />
                <textarea
                    placeholder="Description"
                    required
                    value={ description }
                    onChange={ updateProperty(setDescription) }
                />
                <select onChange={ updateProperty(setType) }>
                    <option disabled>--Type of Workout--</option>
                    <option>Strength</option>
                    <option>Calisthenic</option>
                    <option>Plyometric</option>
                    <option>Cardiovascular</option>
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 1--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 2--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 3--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 4--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 5--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <select onChange={ addExercise }>
                    <option key='none' value='none' className='workout__option'>--Exercise 6--</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <button type="submit" className="exerciseForm__button">Create new workout</button>
            </form>
        </div>
    );
}

export default WorkoutForm;
