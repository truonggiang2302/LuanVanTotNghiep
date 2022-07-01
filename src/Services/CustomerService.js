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
const getAllCustomer = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let customers = await db.Customer.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(customers);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllCustomerOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let customers = await db.Customer.findAndCountAll({
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

      resolve(customers);
    } catch (e) {
      reject(e);
    }
  });
};
let getCustomerByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await db.Customer.findAll({
        where: { CustomerName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(customer);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllCustomer,
  getAllCustomerOfCenter,
  getCustomerByName,
};
