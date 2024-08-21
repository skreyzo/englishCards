'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, User, Progress }) {
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsTo(User, { foreignKey: 'userId', as: 'cadrUser' });
      this.belongsToMany(User, {
        through: Progress,
        foreignKey: 'cardId',
        as: 'studentCard',
      });
    }
  }
  Card.init(
    {
      rusWord: DataTypes.STRING,
      engWord: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
