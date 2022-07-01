import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getAllCenter = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let center = await db.GymCenter.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailCenter = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let center = await db.GymCenter.findOne({
        where: { CenterId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
let getCenterByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let center = await db.GymCenter.findAll({
        where: { CenterName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllCenter,
  getDetailCenter,
  getCenterByName,
};
