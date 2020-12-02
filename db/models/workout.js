'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Workout.associate = function (models) {
    // associations can be defined here
    Workout.belongsTo(models.User, { foreignKey: 'user_id' });
    Workout.hasMany(models.WorkoutExercise, { foreignKey: 'workout_id' });
    Workout.hasMany(models.Comment, {
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'Workout'
      }
    });
    Workout.hasMany(models.Rating, {
      foreignKey: 'ratableId',
      constraints: false,
      scope: {
        ratableType: 'Workout'
      }
    });
  };
  return Workout;
};
