'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_contest: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_provider: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_winner: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_status_contest:{
        allowNull:false,
        type: Sequelize.INTEGER
      },
      evidence_provider: {
        allowNull: true,
        type: Sequelize.STRING
      },
      id_status_provider: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      evidence_admin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      id_status_winner: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment');
  }
};
