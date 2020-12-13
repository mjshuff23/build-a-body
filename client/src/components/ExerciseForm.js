import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { backendUrl } from '../config';
import { addExercise } from '../store/actions/exercises';
import './stylesheets/ExerciseForm.css';

function ExerciseForm({ handleClose }) {
    const token = localStorage.getItem('build-a-body/authentication/token');
    const userId = localStorage.getItem('userId');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [type, setType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [equipment, setEquipment] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();

        async function createExercise() {
            if (!userId) return;

            const response = await fetch(`${backendUrl}/api/exercises`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, body_part: bodyPart, type, difficulty, equipment, video_url: videoUrl, user_id: userId })
            });

            if (response.ok) {
                const exercise = await response.json();
                dispatch(addExercise(exercise));
            }
        }
        createExercise();
        handleClose();
    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    };


    return (
        <div className="new-form-holder centered middled">
            <form spellcheck="false" className="newExerciseForm" onSubmit={ handleSubmit }>
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
                <input
                    type="text"
                    placeholder="Video URL"
                    value={ videoUrl }
                    onChange={ updateProperty(setVideoUrl) }
                />
                <select onChange={ updateProperty(setType) }>
                    <option disabled>--Type of Workout--</option>
                    <option>Strength</option>
                    <option>Calisthenic</option>
                    <option>Plyometric</option>
                    <option>Cardiovascular</option>
                </select>
                <select onChange={ updateProperty(setBodyPart) }>
                    <option disabled>---Body Part---</option>
                    <option disabled>--Arms--</option>
                    <option>Biceps</option>
                    <option>Triceps</option>
                    <option>Forearms</option>
                    <option disabled>--Chest--</option>
                    <option>Pecs</option>
                    <option disabled>--Back--</option>
                    <option>Traps</option>
                    <option>Rhomboids</option>
                    <option>Lats</option>
                    <option>Lower Back</option>
                    <option disabled>--Shoulders--</option>
                    <option>Deltoids</option>
                    <option disabled>--Legs--</option>
                    <option>Quads</option>
                    <option>Hamstrings</option>
                    <option>Calves</option>
                    <option>Glutes</option>
                </select>
                <select onChange={ updateProperty(setDifficulty) }>
                    <option disabled>--Difficulty--</option>
                    <option>Easy</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>
                <select onChange={ updateProperty(setEquipment) }>
                    <option disabled>--Equipment--</option>
                    <option>None</option>
                    <option>Dumbbell</option>
                    <option>Barbell</option>
                    <option>Kettle Bells</option>
                    <option>Resistance Bands</option>
                    <option>Machine</option>
                    <option>Medicine Ball</option>
                    <option>Stability Ball</option>
                    <option>Bosu Ball</option>
                </select>
                <button type="submit" className="exerciseForm__button">Create new Exercise</button>
            </form>
        </div>
    );
}

export default ExerciseForm;
