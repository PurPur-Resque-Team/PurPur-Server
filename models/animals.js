'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      animals.belongsToMany(models.islands, {
        through : 'islands_animals',
        foreignKey: 'fk_animalIdx',
        onDelete: 'cascade'
      })
    }
  };
  animals.init({
    animalIdx: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    animalName: {
      type :DataTypes.STRING,
      allowNull : false
    }
    ,
    animalMissionCount: DataTypes.INTEGER,
    animalProgress: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'animals',
  });
  return animals;
};