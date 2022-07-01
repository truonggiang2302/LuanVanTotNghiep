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
const getAllStaff = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let staffs = await db.Staffs.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(staffs);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPT = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let pts = await db.Staffs.findAndCountAll({
        where: {
          RoleId: 3,
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

      resolve(pts);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailPT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staff = await db.Staffs.findOne({
        where: { StaffId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(staff);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllStaffOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let staffs = await db.Staffs.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
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

      resolve(staffs);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPTOfCenter = async (page, CenterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * 10;
      let pts = await db.Staffs.findAndCountAll({
        where: {
          CenterId: CenterId,
          RoleId: 3,
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

      resolve(pts);
    } catch (e) {
      reject(e);
    }
  });
};
let getStaffByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staff = await db.Staffs.findAll({
        where: { StaffName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(staff);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllStaff,
  getDetailPT,
  getAllStaffOfCenter,
  getAllPT,
  getAllPTOfCenter,
  getStaffByName,
};
