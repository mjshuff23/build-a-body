'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exercises', [
      {
        title: 'Bicep Curl',
        description: 'Start standing with a dumbbell in each hand. Your elbows should rest at your sides and your forearms should extend out in front of your body. \nBring the dumbbells all the way up to your shoulders by bending your elbows. \nOnce at the top, hold for a second by squeezing the muscle. \nReverse the curl slowly and repeat.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Biceps',
        difficulty: 'Easy',
        video_url: 'https://www.youtube.com/embed/sAq_ocpRh_I',
        equipment: 'Dumbbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Hammer Curl', description: 'Stand with your feet shoulder-width apart and a slight bend in your knees. \nHold a pair of dumbbells in your hands with your palms facing towards your body – this is the main difference from the standard curl, which you start with your palms facing forwards. \nKeeping your elbows close to your body, slowly curl the dumbbell up to your shoulders. \nPause for a second at the top of the lift, squeeze your biceps, then lower the weights under control.',
        user_id: 2,
        type: 'Strength',
        body_part: 'Biceps',
        difficulty: 'Easy',
        video_url: 'https://www.youtube.com/embed/zC3nLlEvin4',
        equipment: 'Dumbbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Tricep Dips', description: 'Can be performed on parallel bars at your gym or a bench. \nHold your entire body weight up with your arms extended and feet hovering over the floor, ankles crossed. \nLower your body until your elbows reach a 90-degree angle before returning to your starting position.',
        user_id: 3,
        type: 'Strength',
        body_part: 'Triceps',
        difficulty: 'Intermediate',
        video_url: 'https://www.youtube.com/embed/wjUmnZH528Y',
        equipment: 'n/a',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Bench Press', description: 'Lie on the flat bench with your eyes under the bar. \nGrab the bar. Put your pinky on the ring marks of your bar. \nUnrack. \nTake a big breath and unrack the bar by straightening your arms. \nLower the bar to your mid- chest while tucking your elbows 75°. \nPress.',
        user_id: 1,
        type: 'Strength',
        body_part: 'Chest',
        difficulty: 'Intermediate',
        video_url: 'https://www.youtube.com/embed/lj_pzdeuHbw',
        equipment: 'Barbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Barbell Squat', description: 'Start by bending your hips back while allowing your knees to bend forward, keeping your back straight and your knees pointed same direction as feet. \nDescend until thighs are just past parallel to floor. \nExtend knees and hips until legs are straight. \nReturn and repeat.',
        user_id: 2,
        type: 'Strength',
        body_part: 'Quadriceps',
        difficulty: 'Intermediate',
        video_url: 'https://www.youtube.com/embed/tTEB9jWjjys',
        equipment: 'Barbell',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Lying Hamstring Curls', description: 'Start by adjusting the machine so your thighs and torso sit comfortably on the pads when you’re lying face down. \nGrasp the handles on the front of the machine and curl your lower legs up as far as possible without lifting your thighs off the pad. \nHold for a second at the top of the movement, then lower slowly back to the start.',
        user_id: 3,
        type: 'Strength',
        body_part: 'Hamstrings',
        difficulty: 'Easy',
        video_url: 'https://www.youtube.com/embed/NlZeAGZ_YJw',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Treadmill', description: 'Every treadmill is different, but should be pretty straight forward to start. \nKeep a pace between 3 and 4 mph for as long as you have alloted for yourself. \nCool down for 5 minutes, by slowly lowering your pace each minute. \nExperiment with inclines and faster speeds after the first 1 to 2 weeks.',
        user_id: 1,
        type: 'Cardiovascular',
        body_part: 'Legs',
        difficulty: 'Easy',
        video_url: 'https://www.youtube.com/embed/8i3Vrd95o2k',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Stationary Bike', description: 'Adjust the seat to where you feel comfortable. \nSet the handlebars correctly(if your bike allows adjustments). \nAdjust the pedal straps so that your feet are comfortable, but not too tight. \nDo not pedal with just your toes, and do not hunch over.',
        user_id: 3,
        type: 'Cardiovascular',
        body_part: 'Legs',
        difficulty: 'Easy',
        video_url: 'https://www.youtube.com/embed/S0nRkf5wU5U',
        equipment: 'Machine',
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exercises', null, {});
  }
};
