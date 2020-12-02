'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'This is a great workout!',
        user_id: 1,
        commentableId: 1, commentableType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        content: 'This is a great exercise! Thank you!',
        user_id: 1,
        commentableId: 1, commentableType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        content: 'Another great workout! Thank you!!',
        user_id: 1,
        commentableId: 2, commentableType: 'Workout',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        content: 'Wowww!! Another amazing description of how to exercise correctly!',
        user_id: 1,
        commentableId: 2, commentableType: 'Exercise',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
