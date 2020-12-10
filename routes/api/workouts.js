const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise, Workout, WorkoutExercise, Rating, Comment } = require('../../db/models');

const router = express.Router();

// Get All Workouts
router.get('/', asyncHandler(async (req, res, next) => {
    const workouts = await Workout.findAll({
        include: [{
            model: User, attributes: ['username']
        },
        { model: WorkoutExercise },
        {
            model: Rating, include:
                { model: User, attributes: ['username'] }
        },
        {
            model: Comment, include:
                { model: User, attributes: ['username'] }
        }],
    });

    let workoutsObject = {};
    for (let workout of workouts) {
        // Add up ratings to get average rating
        let ratingCount = 0;
        let ratingSum = 0;
        for (let rating of workout.Ratings) {
            ratingSum += rating.score;
            ratingCount++;
        }
        workout.dataValues.averageRating = ratingSum / ratingCount;
        workout.dataValues.ratingCount = ratingCount;

        workoutsObject[workout.id] = workout;
    }

    res.json(workoutsObject);
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const { title, description,
        user_id, type,
        exerciseList } = req.body;

    const workout = await Workout.create({
        title, description,
        user_id, type
    });

    exerciseList.map(async (exerciseId) => {
        await WorkoutExercise.create({
            workout_id: workout.id,
            exercise_id: exerciseId
        });
    });

    if (workout) {
        return res.json(workout);
    }

    res.json(`An error occured trying to create that workout!`);
}));

router.delete('/:workoutId', asyncHandler(async (req, res) => {
    const workoutId = parseInt(req.params.workoutId);
    const workout = await Workout.findByPk(workoutId);
    if (workout) {
        await workout.destroy();
        return res.json(`Workout ${workoutId} destroyed.`);
    }
    res.json(`An error occurred trying to delete Workout ${workoutId}`);
}));

module.exports = router;
