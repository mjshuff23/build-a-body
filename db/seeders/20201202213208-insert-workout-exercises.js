'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('WorkoutExercises', [
      { workout_id: 1, exercise_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 1, exercise_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 2, exercise_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 2, exercise_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 3, exercise_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 3, exercise_id: 6, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 4, exercise_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { workout_id: 4, exercise_id: 8, createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WorkoutExercises', null, {});
  }
};
