import React, { useEffect } from 'react';
import './stylesheets/MainPage.css';
import { Redirect, Route, Switch } from 'react-router-dom';
// import SideBar from './SideBar';
import Exercises from './Exercises';
import NavBar from './NavBar';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise } from '../store/actions/exercises';
import { setCurrentExerciseGroup, setExercises } from '../store/actions/exercises';
function MainPage() {
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.exercises);

    useEffect(() => {
        // Load Body Parts for menu
        async function fetchData() {
            const token = localStorage.getItem("build-a-body/authentication/token");
            console.log(token);
            const response = await fetch('api/exercises', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const { exerciseObject, bodyPartsArray } = await response.json();
                console.log(exerciseObject, bodyPartsArray);
                dispatch(setExercises(exerciseObject, bodyPartsArray));
                dispatch(addExercise({ id: 10, title: 'CHUAAA' }));
            }
        }
        fetchData();
    }, []);


    return (
        <div className="mainPage">
            {/* <SideBar /> */ }
            <NavBar />
            <Switch>
                <Route exact path='/exercises'><Exercises /></Route>
                <Route exact path='/'><Feed /></Route>
            </Switch>
            {/* Workouts */ }
            {/* Footer */ }
        </div>
    );
}

export default MainPage;
