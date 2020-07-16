'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class missions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      missions.belongsTo(models.animals, {
        foreignKey: 'fk_animalIdx',
        onDelete: 'cascade'
      })
    }
  };
  missions.init({
    missionIdx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fk_animalIdx: DataTypes.INTEGER,
    isCleared: DataTypes.TINYINT,
    missionContent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'missions',
  });
  return missions;
};