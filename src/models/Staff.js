"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Staffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      Staffs.belongsTo(models.Accounts);

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
  Staffs.init(
    {
      StaffId: DataTypes.INTEGER,
      StaffName: DataTypes.STRING,
      StaffImage: DataTypes.STRING,
      StaffPhoneNumber: DataTypes.STRING,
      Gender: DataTypes.BOOLEAN,
      DayOfBirth: DataTypes.STRING,
      Address: DataTypes.STRING,
      RoleId: DataTypes.INTEGER,
      StaffEmail: DataTypes.STRING,
      CenterId: DataTypes.INTEGER,
      SalaryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Staffs",
      freezeTableName: true,
    }
  );
  return Staffs;
};
