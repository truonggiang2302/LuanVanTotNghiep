"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      Booking.belongsTo(models.Staffs, {
        foreignKey: "StaffId",
        // targetKey: "id",
        as: "StaffBooking",
      });
      Booking.belongsTo(models.Customer, {
        foreignKey: "CusId",
        targetKey: "CustomerId",
        as: "CustomerBooking",
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
  Booking.init(
    {
      CusId: DataTypes.INTEGER,
      StaffId: DataTypes.INTEGER,
      CustomerName: DataTypes.STRING,
      PTName: DataTypes.STRING,
      CenterId: DataTypes.INTEGER,
      ServiceId: DataTypes.INTEGER,
      StartTime: DataTypes.STRING,
      EndTime: DataTypes.STRING,
      Status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
      freezeTableName: true,
    }
  );
  return Booking;
};
