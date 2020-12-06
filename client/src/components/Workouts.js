import React from 'react';
import { useSelector } from 'react-redux';

function Workouts() {
    const workoutState = useSelector(state => state.workouts);
    const workouts = Object.values(workoutState.list);
    return (
        <div className='workouts'>
            {workouts ?
                workouts.map(workout => {
                    return (
                        <>
                            <div>{ workout.title } - { workout.type }</div>
                            <div>{ workout.description }</div>
                            <br></br>
                        </>
                    );
                })
                : null }
        </div>
    );
}

export default Workouts;
