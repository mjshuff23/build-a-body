const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../../utils');
const { getUserToken, requireAuth } = require('../../auth');
const { User, Exercise } = require('../../db/models');

const router = express.Router();
// router.use(requireAuth);

// Get All Exercises and Exercise Body Parts
router.get('/', asyncHandler(async (req, res, next) => {
    // Get All Exercises
    const exercises = await Exercise.findAll();

    let exerciseObject = {};
    for (let exercise of exercises) {
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

module.exports = router;
