'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_islands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users_islands.belongsTo(models.users, {
        foreignKey : 'fk_userIdx',
        onDelete : 'cascade'
      })
      users_islands.belongsTo(models.islands, {
        foreignKey : 'fk_islandIdx',
        onDelete : 'cascade'
      })
    }
  };
  users_islands.init({
    fk_userIdx: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fk_islandIdx:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'users_islands',
  });
  return users_islands;
};