import React from 'react';
import { useSelector } from 'react-redux';

function Exercises() {
    const exerciseState = useSelector(state => state.exercises);
    const exercises = Object.values(exerciseState.list);
    return (
        <div className="exercises">
            {exercises ?
                exercises.map(exercise => {
                    let descriptionSteps;
                    if (exercise.description) {
                        descriptionSteps = exercise.description.split(`\n`);
                        console.log(descriptionSteps);
                    }
                    return (
                        <>
                            <br></br>
                            <div>{ exercise.title } - { exercise.type }</div>
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
