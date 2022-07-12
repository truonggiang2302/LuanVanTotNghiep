"use strict";

// const { DataTypes } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("GymCenter", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // CenterId: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      CenterName: {
        type: Sequelize.STRING,
      },
      CenterImage: {
        type: Sequelize.TEXT,
      },
      public_id_image: {
        type: Sequelize.STRING,
      },
      CenterAddress: {
        type: Sequelize.STRING,
      },
      CenterPhoneNumber: {
        type: Sequelize.STRING,
      },
      ManagerId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("GymCenter");
  },
};
