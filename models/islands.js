'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class islands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      islands.belongsToMany(models.users, {
        through : 'users_islands',
        foreignKey: 'fk_islandIdx',
        onDelete: 'cascade'
      });
      islands.belongsToMany(models.animals, {
        through : 'islands_animals',
        foreignKey: 'fk_islandIdx',
        onDelete: 'cascade'
      });
    }
  };
  islands.init({
    islandIdx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    islandName: DataTypes.STRING,
    islandProgress: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'islands',
  });
  return islands;
};