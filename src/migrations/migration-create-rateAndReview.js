"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rateAndReview", {
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
      ratingPoint: {
        type: Sequelize.INTEGER,
      },
      reviewContent: {
        type: Sequelize.TEXT,
      },
      CustomerId: {
        type: Sequelize.INTEGER,
      },
      CenterId: {
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
    await queryInterface.dropTable("rateAndReview");
  },
};
