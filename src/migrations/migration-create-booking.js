"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Booking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CustomerId: {
        // primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StaffId: {
        // primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CustomerName: {
        type: Sequelize.STRING,
      },
      PTName: {
        type: Sequelize.STRING,
      },

      CenterId: {
        type: Sequelize.INTEGER,
      },
      ServiceId: {
        type: Sequelize.INTEGER,
      },
      StartTime: {
        type: Sequelize.DATE,
      },
      EndTime: {
        type: Sequelize.DATE,
      },
      Status: {
        type: Sequelize.STRING,
      },
      idDiscount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Booking");
  },
};
