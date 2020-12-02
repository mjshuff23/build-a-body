'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    score: DataTypes.INTEGER,
    ratableId: DataTypes.INTEGER,
    ratableType: DataTypes.STRING
  }, {});
  Rating.associate = function (models) {
    // associations can be defined here
    Rating.belongsTo(models.Exercise, {
      foreignKey: 'ratableId', constraints: false,
    });
    Rating.belongsTo(models.Workout, {
      foreignKey: 'ratableId', constraints: false,
    });

    Rating.addHook("afterFind", findResult => {
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        if (instance.ratableType === "Exercise" && instance.Exercise !== undefined) {
          instance.ratable = instance.Exercise;
        } else if (instance.ratableType === "Workout" && instance.Workout !== undefined) {
          instance.ratable = instance.Workout;
        }
        // To prevent mistakes:
        delete instance.Exercise;
        delete instance.dataValues.Exercise;
        delete instance.Workout;
        delete instance.dataValues.Workout;
      }
    });

    Rating.prototype.getRatable = function (options) {
      if (!this.ratableType) return Promise.resolve(null);
      const mixinMethodName = `get${this.ratableType}`;
      return this[mixinMethodName](options);
    };
  };
  return Rating;
};
