'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    content: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING
  }, {});

  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Exercise, {
      foreignKey: 'commentableId', constraints: false
    });

    Comment.belongsTo(models.Workout, {
      foreignKey: 'commentableId', constraints: false
    });

    Comment.addHook("afterFind", findResult => {
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        if (instance.commentableType === "Exercise" && instance.Exercise !== undefined) {
          instance.commentable = instance.Exercise;
        } else if (instance.commentableType === "Workout" && instance.Workout !== undefined) {
          instance.commentable = instance.Workout;
        }
        // To prevent mistakes:
        delete instance.Exercise;
        delete instance.dataValues.Exercise;
        delete instance.Workout;
        delete instance.dataValues.Workout;
      }
    });
  };

  Comment.prototype.getCommentable = function (options) {
    if (!this.commentableType) return Promise.resolve(null);
    const mixinMethodName = `get${this.commentableType}`;
    return this[mixinMethodName](options);
  };
  return Comment;
};
