"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StaffService", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ServiceId: {
        type: Sequelize.INTEGER,
      },
      ServiceName: {
        type: Sequelize.STRING,
      },
      StaffId: {
        type: Sequelize.INTEGER,
      },

      StaffName: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StaffService");
  },
};
