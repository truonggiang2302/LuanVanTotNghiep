"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rateAndReview extends Model {
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
  rateAndReview.init(
    {
      // ManagerId: DataTypes.INTEGER,
      ratingPoint: DataTypes.INTEGER,
      reviewContent: DataTypes.TEXT,
      CustomerId: DataTypes.INTEGER,
      StaffId: DataTypes.INTEGER,
      CenterId: DataTypes.INTEGER,
      Status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rateAndReview",
      freezeTableName: true,
    }
  );
  return rateAndReview;
};
