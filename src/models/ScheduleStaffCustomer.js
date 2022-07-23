"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScheduleStaffCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      // Manager.belongsTo(models.Accounts, {
      //   foreignKey: "ExternalId",
      //   // targetKey: "id",
      //   as: "AccountManager",
      // });
      // Manager.belongsTo(models.Salary, {
      //   foreignKey: "SalaryId",
      //   as: "SalaryManager",
      // });
    }
  }
  ScheduleStaffCustomer.init(
    {
      ServiceId: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
      StaffId: DataTypes.INTEGER,
      StartTime: DataTypes.DATE,
      EndTime: DataTypes.DATE,
      TimeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ScheduleStaffCustomer",
      freezeTableName: true,
    }
  );
  return ScheduleStaffCustomer;
};
