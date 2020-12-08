import React, { useEffect } from 'react';
import './stylesheets/MainPage.css';
import { Redirect, Route, Switch } from 'react-router-dom';
// import SideBar from './SideBar';
import Exercises from './Exercises';
import NavBar from './NavBar';
import Feed from './Feed';
import Workouts from './Workouts';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise } from '../store/actions/exercises';
import { setCurrentExerciseGroup, setExercises } from '../store/actions/exercises';
import { setWorkouts } from '../store/actions/workouts';
import { backendUrl } from '../config';
function MainPage() {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises);

    useEffect(() => {
        // Load Body Parts for menu
        const token = localStorage.getItem("build-a-body/authentication/token");
        async function fetchExercises() {
            const response = await fetch(`${backendUrl}/api/exercises`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const { exerciseObject, bodyPartsArray } = await response.json();
                dispatch(setExercises(exerciseObject, bodyPartsArray));
            }
        }
        fetchExercises();

        async function fetchWorkouts() {
            const response = await fetch(`${backendUrl}/api/workouts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const workoutsObject = await response.json();
                dispatch(setWorkouts(workoutsObject));
            }
        }
        fetchWorkouts();
    }, []);


    return (
        <div className="mainPage">
            {/* <SideBar /> */ }
            <NavBar />
            <Switch>
                <Route exact path='/exercises'><Exercises /></Route>
                <Route exact path='/workouts'><Workouts /></Route>
                <Route path={ `/user/` }><User /></Route>
                <Route exact path='/'><Feed /></Route>
            </Switch>
            {/* Workouts */ }
            {/* Footer */ }
        </div>
    );
}

export default MainPage;
