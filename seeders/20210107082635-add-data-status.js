'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [{
        status: "Open",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Closed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Waiting for payment confirmation",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Win",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Lose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Unpaid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Paid",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {})
  }
};
