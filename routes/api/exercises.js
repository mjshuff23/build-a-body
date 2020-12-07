const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise, Rating, Comment } = require('../../db/models');
const rating = require('../../db/models/rating');

const router = express.Router();
// router.use(requireAuth);

// Get All Exercises and Exercise Body Parts
router.get('/', asyncHandler(async (req, res, next) => {
    // Get All Exercises
    const exercises = await Exercise.findAll({
        include: [{
            model: User, attributes: ['username']
        },
        {
            model: Rating, include:
                { model: User, attributes: ['username'] }
        },
        {
            model: Comment, include:
                { model: User, attributes: ['username'] }
        }]
    });

    let exerciseObject = {};
    for (let exercise of exercises) {
        let ratingCount = 0;
        let ratingSum = 0;
        for (let rating of exercise.Ratings) {
            ratingSum += rating.score;
            ratingCount++;
        }
        exercise.dataValues.averageRating = ratingSum / ratingCount;
        exercise.dataValues.ratingCount = ratingCount;

        exerciseObject[exercise.id] = exercise;
    }
    console.log(`Exercise Object:`, exerciseObject);

    // Loop through Exercises to build a list of body parts
    let bodyParts = new Set();
    for (let exercise of exercises) {
        bodyParts.add(exercise.body_part);
    }
    const bodyPartsArray = Array.from(bodyParts);

    // Return exercises and associated body parts
    res.json({ exerciseObject, bodyPartsArray });
}));

router.delete('/:exerciseId', asyncHandler(async (req, res, next) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const exercise = await Exercise.findByPk(exerciseId);
    if (exercise) {
        await exercise.destroy();
        // console.log(exercise);
        return res.json(`Exercise ${exerciseId} destroyed.`);
    }
    res.json(`An error occurred trying to delete Exercise ${exerciseId}`);
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const { title, description,
        user_id, type,
        body_part, difficulty,
        equipment } = req.body;

    const exercise = await Exercise.create({
        title, description,
        user_id, type,
        body_part, difficulty,
        equipment
    });

    if (exercise) {
        return res.json(exercise);
    }

    res.json(`An error occured trying to create that exercise!`);
}));

module.exports = router;
