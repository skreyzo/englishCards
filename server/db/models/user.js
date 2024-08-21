'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Card, Progress }) {
      this.hasMany(Card, { foreignKey: 'userId', as: 'author' });
      this.belongsToMany(Card, {
        through: Progress,
        foreignKey: 'userId',
        as: 'student',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashpass: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
