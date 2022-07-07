"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ScheduleWorking", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // ScheduleId: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },

      DayWork: {
        type: Sequelize.DATE,
      },
      DayOff: {
        type: Sequelize.DATE,
      },
      StaffId: {
        type: Sequelize.INTEGER,
      },
      ManagerId: {
        type: Sequelize.INTEGER,
      },
      TimeWork: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("ScheduleWorking");
  },
};
