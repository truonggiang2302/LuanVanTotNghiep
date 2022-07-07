"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Customer", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AccountId: {
        type: Sequelize.INTEGER,
      },
      CustomerName: {
        type: Sequelize.STRING,
      },
      Gender: {
        type: Sequelize.BOOLEAN,
      },
      DayOfBirth: {
        type: Sequelize.STRING,
      },
      PhoneNumber: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
      CustomerImage: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      public_id_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CustomerEmail: {
        type: Sequelize.STRING,
      },
      CenterId: {
        type: Sequelize.INTEGER,
      },
      ExternalId: {
        allowNull: false,
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
    await queryInterface.dropTable("Customer");
  },
};
