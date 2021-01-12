'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('role', [{
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "Provider",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role: "Participant",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('role', null, {})
  }
};
