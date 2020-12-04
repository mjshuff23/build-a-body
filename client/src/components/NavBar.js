import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './stylesheets/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    const dispatch = useDispatch();

    return (
        <div>NavBar</div>
    );

}

export default NavBar;



// const [anchorElExercises, setAnchorElExercises] = React.useState(null);
// const handleClickExercises = (event) => {
//     setAnchorElExercises(event.currentTarget);
// };
// const handleCloseExercises = (bodyPart) => {
//     setAnchorElExercises(null);
//     // Set Current Body Part for Exercises
//     dispatch(setCurrentExerciseGroup(bodyPart));
//     console.log(bodyPart);
// };

// const [anchorElWorkouts, setAnchorElWorkouts] = React.useState(null);
// const handleClickWorkouts = (event) => {
//     setAnchorElWorkouts(event.currentTarget);
// };
// const handleCloseWorkouts = () => {
//     setAnchorElWorkouts(null);
// };

// const [anchorElUser, setAnchorElUser] = React.useState(null);
// const handleClickUser = (event) => {
//     setAnchorElUser(event.currentTarget);
// };
// const handleCloseUser = () => {
//     setAnchorElUser(null);
// };

// return (
//     <div className="navBar">
//         <div className="navBar__menuLink">
//             {/* Exercises */ }
//             <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClickExercises }>
//                 Exercises
//                 </Button>
//             <Menu
//                 id="simple-menu"
//                 anchorEl={ anchorElExercises }
//                 keepMounted
//                 open={ Boolean(anchorElExercises) }
//                 onClose={ handleCloseExercises }
//             >
//                 { exercises.bodyParts.length ? exercises.bodyParts.map((bodyPart, idx) => {
//                     return (
//                         <MenuItem onClick={ () => handleCloseExercises(bodyPart) }>{ bodyPart }</MenuItem>
//                     );
//                 }) : null }
//             </Menu>
//         </div>

//         <div className="navBar__menuLink">
//             {/* Workouts */ }
//             <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClickWorkouts }>
//                 Workouts
//             </Button>
//             <Menu
//                 id="simple-menu"
//                 anchorEl={ anchorElWorkouts }
//                 keepMounted
//                 open={ Boolean(anchorElWorkouts) }
//                 onClose={ handleCloseWorkouts }
//             >
//                 {// TODO: Replace with workout types
//                     exercises.bodyParts.length ? exercises.bodyParts.map((bodyPart, idx) => {
//                         return (
//                             <MenuItem onClick={ handleCloseWorkouts }>{ bodyPart }</MenuItem>
//                         );
//                     }) : null }
//             </Menu>
//         </div>

//         <div className="navBar__menuLink">
//             {/* User */ }
//             <Button aria-controls="simple-menu" aria-haspopup="true" onClick={ handleClickUser }>
//                 User Settings
//             </Button>
//             <Menu
//                 id="simple-menu"
//                 anchorEl={ anchorElUser }
//                 keepMounted
//                 open={ Boolean(anchorElUser) }
//                 onClose={ handleCloseUser }
//             >
//                 {// TODO: Replace with workout types
//                     exercises.bodyParts.length ? exercises.bodyParts.map((bodyPart, idx) => {
//                         return (
//                             <MenuItem onClick={ handleCloseUser }>{ bodyPart }</MenuItem>
//                         );
//                     }) : null }
//             </Menu>
//         </div>
//     </div>
// );
