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
                <input
                    type="text"
                    placeholder="Separate Steps with \n"
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
                <input
                    type="text"
                    placeholder="Type of Workout? (Strength, Cardio, Plyo, ...)"
                    required
                    value={ type }
                    onChange={ updateProperty(setType) }
                />
                <input
                    type="text"
                    placeholder="Body Part"
                    required
                    value={ bodyPart }
                    onChange={ updateProperty(setBodyPart) }
                />
                <input
                    type="text"
                    placeholder="Difficulty"
                    required
                    value={ difficulty }
                    onChange={ updateProperty(setDifficulty) }
                />
                <input
                    type="text"
                    placeholder="Equipment"
                    value={ equipment }
                    onChange={ updateProperty(setEquipment) }
                />
                {/* <select onChange={ updateProperty(setType) }>
                    { types.map((type) => (
                        <option key={ type }>{ type }</option>
                    )) }
                </select> */}
                <button type="submit" className="exerciseForm__button">Update Exercise</button>
            </form>
        </div>
    );
}

export default ExerciseFormEdit;
