const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise, Workout, WorkoutExercise } = require('../../db/models');

const router = express.Router();
// router.use(requireAuth);

// Get All Workouts
router.get('/', asyncHandler(async (req, res, next) => {
    // Get All Exercises
    const workouts = await Workout.findAll({
        include: {
            model: WorkoutExercise
        }
    });

    let workoutsObject = {};
    for (let workout of workouts) {
        workoutsObject[workout.id] = workout;
    }

    res.json(workoutsObject);
}));

module.exports = router;
