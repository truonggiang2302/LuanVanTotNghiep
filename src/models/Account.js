"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here//
      //1 account thuộc về 1 khách hàng
      Accounts.hasOne(models.Customer, {
        foreignKey: "AccountId",
        as: "AccountCustomer",
      });
      //1 account thuộc về 1 nhân viên
      Accounts.hasOne(models.Staffs, {
        foreignKey: "AccountId",
        as: "AccountStaff",
      });
      //1 account thuộc về 1 quan3 ly1
      Accounts.hasOne(models.Manager, {
        foreignKey: "AccountId",
        as: "AccountManager",
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
  Accounts.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      userName: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      userToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Accounts",
      freezeTableName: true,
    }
  );
  return Accounts;
};
