'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Workouts', [
      {
        title: 'Push Day',
        description: 'In this workout, we will be focusing on pushing exercises, which focuses on your triceps, chest, and shoulders.',
        user_id: 1,
        type: 'Strength',
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: 'Pull Day',
        description: 'In this workout, we will be focusing on pulling exercises, which focuses on your biceps, back, and trapezoids.',
        user_id: 1,
        type: 'Strength',
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: 'Leg Day',
        description: 'In this workout, we are going to destroy your entire lower body.  During leg day, we focus on your quadriceps, hamstrings, glutes, and calves.',
        user_id: 1,
        type: 'Strength',
        createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: 'Cardio Day',
        description: 'In this workout, we will be working on your cardio and endurance.  Exercises include the Treadmill, Stair Master, Stationary Bike, as well as others',
        user_id: 1,
        type: 'Cardio',
        createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Workouts', null, {});
  }
};
