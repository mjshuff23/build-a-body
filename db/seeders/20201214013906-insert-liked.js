'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likeds', [
      {
        user_id: 1,
        likedId: 1, likedType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 2,
        likedId: 1, likedType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 1,
        likedId: 1, likedType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 3,
        likedId: 1, likedType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 1,
        likedId: 2, likedType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 2,
        likedId: 2, likedType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        user_id: 3,
        likedId: 1, likedType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likeds', null, {});
  }
};
