"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Manager", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // ManagerId: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      AccountId: {
        type: Sequelize.INTEGER,
      },
      ManagerName: {
        type: Sequelize.STRING,
      },
      ManagerEmail: {
        type: Sequelize.STRING,
      },
      ManagerPhone: {
        type: Sequelize.STRING,
      },
      Gender: {
        type: Sequelize.BOOLEAN,
      },
      ManagerAddress: {
        type: Sequelize.STRING,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
      ManagerImage: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      public_id_image: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      CenterId: {
        type: Sequelize.INTEGER,
      },
      SalaryId: {
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
    await queryInterface.dropTable("Manager");
  },
};
