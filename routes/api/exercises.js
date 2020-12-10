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
        exercise.dataValues.voterIds = [];
        for (let rating of exercise.Ratings) {
            exercise.dataValues.voterIds.push([rating.user_id, rating.score]);
            ratingSum += rating.score;
            ratingCount++;
        }
        exercise.dataValues.averageRating = ratingSum / ratingCount;
        exercise.dataValues.ratingCount = ratingCount;

        exerciseObject[exercise.id] = exercise;
    }

    // Loop through Exercises to build a list of body parts
    let bodyParts = new Set();
    for (let exercise of exercises) {
        bodyParts.add(exercise.body_part);
    }
    const bodyPartsArray = Array.from(bodyParts);

    // Return exercises and associated body parts
    res.json({ exerciseObject, bodyPartsArray });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { title, description,
        user_id, type,
        body_part, difficulty,
        equipment, video_url } = req.body;

    const exercise = await Exercise.create({
        title, description,
        user_id, type,
        body_part, difficulty,
        equipment, video_url
    });

    exercise.dataValues.voterIds = [];
    exercise.dataValues.averageRating = 0;
    exercise.dataValues.ratingCount = 0;
    exercise.dataValues.Ratings = [];

    if (exercise) {
        return res.json(exercise);
    }

    res.json(`An error occured trying to create that exercise!`);
}));


router.delete('/:exerciseId', asyncHandler(async (req, res) => {
    const exerciseId = parseInt(req.params.exerciseId);
    const exercise = await Exercise.findByPk(exerciseId);
    if (exercise) {
        await exercise.destroy();
        return res.json(`Exercise ${exerciseId} destroyed.`);
    }
    res.json(`An error occurred trying to delete Exercise ${exerciseId}`);
}));


router.put(`/:exerciseId`, asyncHandler(async (req, res) => {
    const { title, description, type, body_part,
        difficulty, equipment, video_url } = req.body;

    const exercise = await Exercise.findByPk(parseInt(req.params.exerciseId));

    exercise.title = title;
    exercise.description = description;
    exercise.type = type;
    exercise.body_part = body_part;
    exercise.difficulty = difficulty;
    exercise.equipment = equipment;
    exercise.video_url = video_url;

    await exercise.save();

    if (exercise) {
        return res.json(exercise);
    }

    res.json(`An error occured trying to edit that exercise!`);
}));

router.post(`/:exerciseId/ratings/`, asyncHandler(async (req, res) => {
    // Create Rating for exercise and return it
    const exerciseId = parseInt(req.params.exerciseId);
    const { score, userId } = req.body;

    const ratings = await Rating.findAll({
        where: {
            user_id: userId,
            ratableId: exerciseId,
            ratableType: 'Exercise'
        }
    });

    if (ratings.length) {
        return res.json("You've already voted on that exercise!");
    }

    const rating = await Rating.create({
        score,
        user_id: userId,
        ratableId: exerciseId,
        ratableType: 'Exercise',
    });

    if (rating) {
        return res.json(rating);
    }

    res.json(`An error occured trying to add that rating!`);
}));

module.exports = router;
