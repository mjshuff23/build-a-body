import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Exercises from './Exercises';
import NavBar from './NavBar';
import Feed from './Feed';
import Workouts from './Workouts';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { setExercises } from '../store/actions/exercises';
import { setWorkouts } from '../store/actions/workouts';
import { backendUrl } from '../config';
import './stylesheets/MainPage.css';


function MainPage() {
    const exerciseState = useSelector(state => state.exercises);

    const dispatch = useDispatch();

    useEffect(() => {
        // Load Exercises and Body Parts for Redux
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
        // Load Workouts for Redux
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
    }, [dispatch]);


    return (
        <div className="mainPage">
            <NavBar />
            <Switch>
                <Route exact path='/exercises'><Exercises /></Route>
                <Route exact path='/workouts'><Workouts /></Route>
                <Route path={ `/user/` }><User /></Route>
                <Route exact path='/'><Feed /></Route>
            </Switch>
        </div>
    );
}

export default MainPage;
