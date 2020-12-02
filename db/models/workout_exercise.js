'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkoutExercise = sequelize.define('WorkoutExercise', {
    workout_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER
  }, {});
  WorkoutExercise.associate = function (models) {
    // associations can be defined here
    WorkoutExercise.belongsTo(models.Workout, { foreignKey: 'workout_id' });
    WorkoutExercise.belongsTo(models.Exercise, { foreignKey: 'exercise_id' });
  };
  return WorkoutExercise;
};
