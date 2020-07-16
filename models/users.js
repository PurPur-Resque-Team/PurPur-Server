'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsToMany(models.islands, {
        through : 'users_islands',
        foreignKey: 'fk_userIdx',
        onDelete: 'cascade'
      });
    }
  };
  users.init({
    userIdx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userName: {
      type: DataTypes.STRING,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};