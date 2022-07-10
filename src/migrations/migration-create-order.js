"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Order", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // orderId: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   // primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      CustomerId: {
        type: Sequelize.INTEGER,
      },
      ReservationId: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.STRING,
      },
      Status: {
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
    await queryInterface.dropTable("Order");
  },
};
