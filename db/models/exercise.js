'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    body_part: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    equipment: DataTypes.STRING
  }, {});
  Exercise.associate = function (models) {
    // associations can be defined here
    Exercise.belongsTo(models.User, { foreignKey: 'user_id' });
    Exercise.hasMany(models.WorkoutExercise, { foreignKey: 'exercise_id' });
    Exercise.hasMany(models.Comment, {
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'Exercise',
      },
    });
    Exercise.hasMany(models.Rating, {
      foreignKey: 'ratableId',
      constraints: false,
      scope: {
        ratableType: 'Exercise',
      },
    });
  };
  return Exercise;
};
