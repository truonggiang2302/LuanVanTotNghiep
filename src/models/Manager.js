"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      Manager.belongsTo(models.Accounts, {
        foreignKey: "id",
        as: "AccountManager",
      });
      Manager.belongsTo(models.Salary, {
        foreignKey: "SalaryId",
        as: "SalaryManager",
      });

      // Một người dùng thuộc 1 role //
      // Users.belongsTo(models.Roles, { foreignKey: 'roleId', targetKey: 'id', as: 'UserRoles' })
      // Một user có nhiều lịch sử nghe //
      // Users.hasMany(models.HistoryListen, { foreignKey: 'userId', as: 'UserHistory' })
      // Một user có nhiều lượt like nhạc //
      // Users.hasMany(models.LikeSong, { foreignKey: 'userId', as: 'UserLike' })
      // Một user có nhiều playlists //
      // Users.hasMany(models.Playlists, { foreignKey: 'userId', as: 'UserPlaylist' })
      // Một user thích nhiều bài hát //
      // Users.belongsToMany(models.Songs, { as: 'SongOfUser', through: models.LikeSong, foreignKey: 'userId' });
    }
  }
  Manager.init(
    {
      ManagerId: DataTypes.INTEGER,
      ManagerName: DataTypes.STRING,
      ManagerEmail: DataTypes.STRING,
      ManagerPhone: DataTypes.STRING,
      Gender: DataTypes.BOOLEAN,
      ManagerAddress: DataTypes.STRING,
      RoleId: DataTypes.INTEGER,
      ManagerImage: DataTypes.STRING,
      CenterId: DataTypes.INTEGER,
      SalaryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Manager",
      freezeTableName: true,
    }
  );
  return Manager;
};
