'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ratings', [
      {
        score: 5, user_id: 1,
        ratableId: 1, ratableType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        score: 4, user_id: 1,
        ratableId: 2, ratableType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        score: 5, user_id: 1,
        ratableId: 3, ratableType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        score: 2, user_id: 1,
        ratableId: 1, ratableType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ratings', null, {});
  }
};
