'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('exercises', [
      {
        title: 'Bicep Curl',
        description: '1. Start standing with a dumbbell in each hand. Your elbows should rest at your sides and your forearms should extend out in front of your body. \n2. Bring the dumbbells all the way up to your shoulders by bending your elbows. \n3. Once at the top, hold for a second by squeezing the muscle. \n4. Reverse the curl slowly and repeat.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Biceps',
        difficulty: 'Easy',
        equipment: 'Dumbbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Hammer Curl', description: '1. Stand with your feet shoulder-width apart and a slight bend in your knees. \n2. Hold a pair of dumbbells in your hands with your palms facing towards your body – this is the main difference from the standard curl, which you start with your palms facing forwards. \n3. Keeping your elbows close to your body, slowly curl the dumbbell up to your shoulders. \n4. Pause for a second at the top of the lift, squeeze your biceps, then lower the weights under control.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Biceps',
        difficulty: 'Easy',
        equipment: 'Dumbbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Tricep Dips', description: 'Can be performed on parallel bars at your gym or a bench. \n1. Hold your entire body weight up with your arms extended and feet hovering over the floor, ankles crossed. \n2. Lower your body until your elbows reach a 90-degree angle before returning to your starting position.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Triceps',
        difficulty: 'Intermediate',
        equipment: 'n/a',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Bench Press', description: '1. Lie on the flat bench with your eyes under the bar. \n2. Grab the bar. Put your pinky on the ring marks of your bar. \n3. Unrack. \n4. Take a big breath and unrack the bar by straightening your arms. \n5. Lower the bar to your mid- chest while tucking your elbows 75°. \n6. Press.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Chest',
        difficulty: 'Intermediate',
        equipment: 'Barbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Barbell Squat', description: '1. Start by bending your hips back while allowing your knees to bend forward, keeping your back straight and your knees pointed same direction as feet. \n2. Descend until thighs are just past parallel to floor. \n3. Extend knees and hips until legs are straight. \n4. Return and repeat.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Quadriceps',
        difficulty: 'Intermediate',
        equipment: 'Barbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Lying Hamstring Curls', description: '1. Start by adjusting the machine so your thighs and torso sit comfortably on the pads when you’re lying face down. \n2. Grasp the handles on the front of the machine and curl your lower legs up as far as possible without lifting your thighs off the pad. \n3. Hold for a second at the top of the movement, then lower slowly back to the start.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Hamstrings',
        difficulty: 'Easy',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Treadmill', description: 'Every treadmill is different, but should be pretty straight forward to start. \n\n1. Keep a pace between 3 and 4 mph for as long as you have alloted for yourself. \n2. Cool down for 5 minutes, by slowly lowering your pace each minute. \n3. Experiment with inclines and faster speeds after the first 1 to 2 weeks.',
        user_id: 1,
        type: 'Cardiovascular',
        body_part: 'Legs',
        difficulty: 'Easy',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Stationary Bike', description: '1. Adjust the seat to where you feel comfortable. \n2. Set the handlebars correctly(if your bike allows adjustments). \n3. Adjust the pedal straps so that your feet are comfortable, but not too tight. \n4. Do not pedal with just your toes, and do not hunch over.',
        user_id: 1,
        type: 'Cardiovascular',
        body_part: 'Legs',
        difficulty: 'Easy',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('exercises', null, {});
  }
};
