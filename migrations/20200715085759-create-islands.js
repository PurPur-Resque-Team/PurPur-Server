'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('islands', {
      islandIdx: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      islandName: {
        type: Sequelize.STRING
      },
      
      islandProgress: {
        type: Sequelize.FLOAT
      },
      islandStatus : {
        type : Sequelize.INTEGER
      },
      isOpened : {
        type : Sequelize.TINYINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('islands');
  }
};