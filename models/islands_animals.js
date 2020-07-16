'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class islands_animals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      islands_animals.belongsTo(models.islands, {
        foreignKey : 'fk_islandIdx',
        onDelete : 'cascade'
      })
      islands_animals.belongsTo(models.animals, {
        foreignKey : 'fk_animalIdx',
        onDelete : 'cascade'
      })
    }
  };
  islands_animals.init({
    fk_animalIdx: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fk_islandIdx: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'islands_animals',
  });
  return islands_animals;
};