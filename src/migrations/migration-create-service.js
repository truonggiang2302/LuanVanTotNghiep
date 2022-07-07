"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // ServiceId: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      ServiceName: {
        type: Sequelize.STRING,
      },
      WorkDuration: {
        type: Sequelize.INTEGER,
      },
      Price: {
        type: Sequelize.STRING,
      },
      ServiceImage: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      public_id_image: {
        allowNull: false,
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
    await queryInterface.dropTable("Services");
  },
};
