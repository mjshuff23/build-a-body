'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout_exercise = sequelize.define('workout_exercise', {
    workout_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER
  }, {});
  Workout_exercise.associate = function (models) {
    // associations can be defined here
    Workout_exercise.belongsTo(models.Workout, { foreignKey: 'workout_id' });
    Workout_exercise.belongsTo(models.Exercise, { foreignKey: 'exercise_id' });
  };
  return Workout_exercise;
};
