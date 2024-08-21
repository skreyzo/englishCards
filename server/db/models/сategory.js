'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Сategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Сard}) {
      this.hasMany(Сard, {foreignKey: 'categoryId'})
    }
  }
  Сategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Сategory',
  });
  return Сategory;
};