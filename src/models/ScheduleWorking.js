"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScheduleWorking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      ScheduleWorking.belongsTo(models.Staffs, {
        foreignKey: "id",
        as: "ScheduleWorkStaff",
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
  ScheduleWorking.init(
    {
      // ScheduleId: DataTypes.INTEGER,
      DayWork: DataTypes.DATE,
      DayOff: DataTypes.DATE,
      StaffId: DataTypes.INTEGER,
      ManagerId: DataTypes.INTEGER,
      TimeWork: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ScheduleWorking",
      freezeTableName: true,
    }
  );
  return ScheduleWorking;
};
