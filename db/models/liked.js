'use strict';
module.exports = (sequelize, DataTypes) => {
  const Liked = sequelize.define('Liked', {
    user_id: DataTypes.INTEGER,
    likedId: DataTypes.INTEGER,
    likedType: DataTypes.STRING
  }, {});
  Liked.associate = function (models) {
    Liked.belongsTo(models.Exercise, {
      foreignKey: 'likedId', constraints: false,
    });
    Liked.belongsTo(models.Workout, {
      foreignKey: 'likedId', constraints: false,
    });
    Liked.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    Liked.addHook("afterFind", findResult => {
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        if (instance.likedType === "Exercise" && instance.Exercise !== undefined) {
          instance.likable = instance.Exercise;
        } else if (instance.likedType === "Workout" && instance.Workout !== undefined) {
          instance.likable = instance.Workout;
        }
        // To prevent mistakes;
        delete instance.Exercise;
        delete instance.dataValues.Exercise;
        delete instance.Workout;
        delete instance.dataValues.Workout;
      }
    });

    Liked.prototype.getLikable = function (options) {
      if (!this.likedType) return Promise.resolve(null);
      const mixinMethodName = `get${this.likedType}`;
      return this[mixinMethodName](options);
    };
  };
  return Liked;
};
