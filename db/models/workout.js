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
    Workout.hasMany(models.WorkoutExercise, { foreignKey: 'workout_id', onDelete: 'CASCADE', hooks: true });

    Workout.hasMany(models.Comment, {
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'Workout'
      }, onDelete: 'CASCADE', hooks: true
    });

    Workout.hasMany(models.Rating, {
      foreignKey: 'ratableId',
      constraints: false,
      scope: {
        ratableType: 'Workout'
      },
      onDelete: 'CASCADE',
      hooks: true
    });

    Workout.hasMany(models.Liked, {
      foreignKey: 'likedId',
      constraints: false,
      scope: {
        likedType: 'Workout',
      },
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return Workout;
};
