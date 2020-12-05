const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise, Workout, WorkoutExercise, Rating, Comment } = require('../../db/models');

const router = express.Router();
// router.use(requireAuth);

// Get All Workouts
router.get('/', asyncHandler(async (req, res, next) => {
    // Get All Exercises
    const workouts = await Workout.findAll({
        include: [{ model: User, attributes: ['username'] }, { model: WorkoutExercise }, { model: Rating, include: { model: User, attributes: ['username'] } }, { model: Comment, include: { model: User, attributes: ['username'] } }],
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

module.exports = router;
