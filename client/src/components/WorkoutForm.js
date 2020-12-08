import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendUrl } from '../config';
import { addWorkout } from '../store/actions/workouts';

function WorkoutForm() {
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

            const response = await fetch(`${backendUrl}/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, type, user_id: userId, exerciseList })
            });

            if (response.ok) {
                const workout = await response.json();
                // TODO: Dispatch addition of exercise to Redux
                dispatch(addWorkout(workout));
            }
        }
        createWorkout();
    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    };

    const addExercise = (e) => {
        if (e.target.value === 'none') return;
        exerciseList.push(e.target.value);
        window.alert('Exercise Added!');
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
                <input
                    type="text"
                    placeholder="Description"
                    required
                    value={ description }
                    onChange={ updateProperty(setDescription) }
                />
                <input
                    type="text"
                    placeholder="Type of Workout? (Strength, Cardio, Plyo, ...)"
                    required
                    value={ type }
                    onChange={ updateProperty(setType) }
                />
                <select onChange={ addExercise }>
                    <option key='none' value='none'>None</option>
                    { exercises.map((exercise) => (
                        <option key={ exercise.title } value={ exercise.id }>{ exercise.title }</option>
                    )) }
                </select>
                <button type="submit">Create new workout</button>
            </form>
        </div>
    );
}

export default WorkoutForm;
