import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendUrl } from '../config';
import { addExercise } from '../store/actions/exercises';
import './stylesheets/ExerciseForm.css';

function ExerciseFormEdit(props) {
    const dispatch = useDispatch();
    const exerciseList = useSelector(state => state.exercises.list);

    const [title, setTitle] = useState(exerciseList[props.exerciseId].title);
    const [description, setDescription] = useState(exerciseList[props.exerciseId].description);
    const [bodyPart, setBodyPart] = useState(exerciseList[props.exerciseId].body_part);
    const [type, setType] = useState(exerciseList[props.exerciseId].type);
    const [difficulty, setDifficulty] = useState(exerciseList[props.exerciseId].difficulty);
    const [equipment, setEquipment] = useState(exerciseList[props.exerciseId].equipment);
    const [videoUrl, setVideoUrl] = useState(exerciseList[props.exerciseId].video_url);


    const token = localStorage.getItem('build-a-body/authentication/token');
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        async function editExercise() {
            if (!userId) return;

            const response = await fetch(`${backendUrl}/api/exercises/${props.exerciseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, description, body_part: bodyPart, type, difficulty, equipment, video_url: videoUrl, user_id: userId })
            });

            if (response.ok) {
                const exercise = await response.json();
                // TODO: Dispatch Edit Exercise
                dispatch(addExercise(exercise));
            }
        }
        editExercise();
        props.handleCloseEdit();
    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    };


    return (
        <div className="new-form-holder centered middled">
            <form className="newExerciseForm" onSubmit={ handleSubmit }>
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
                    <option selected>{ type }</option>
                    <option disabled>--Type of Exercise--</option>
                    <option>Strength</option>
                    <option>Calisthenic</option>
                    <option>Plyometric</option>
                    <option>Cardiovascular</option>
                </select>
                <select onChange={ updateProperty(setBodyPart) }>
                    <option selected>{ bodyPart }</option>
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
                    <option selected>{ difficulty }</option>
                    <option disabled>--Difficulty--</option>
                    <option>Easy</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>
                <select onChange={ updateProperty(setEquipment) }>
                    <option selected>{ equipment }</option>
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
                <button type="submit" className="exerciseForm__button">Update Exercise</button>
            </form>
        </div>
    );
}

export default ExerciseFormEdit;
