import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
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
const getAllService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.ServiceName;
      let services = await db.Services.findAndCountAll({
        where: {
          [Op.and]: [
            nameInput && {
              ServiceName: { [op.iLike]: `%${nameInput}%` },
            },
          ],
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(services);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let service = await db.Services.findOne({
        where: { ServiceId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(service);
    } catch (e) {
      reject(e);
    }
  });
};
let getServiceByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let service = await db.Services.findAll({
        where: { ServiceName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(service);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Services.create({
        ServiceName: data.ServiceName,
        WorkDuration: data.WorkDuration,
        Price: data.Price,
        ServiceImage: data.ServiceImage,
      });
      resolve({
        errCode: 0,
        errMessage: "create service is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllService,
  getDetailService,
  getServiceByName,
  createNewService,
};
