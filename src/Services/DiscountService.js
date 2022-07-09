import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getDetailDiscount = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const skip = (payloadReq.page - 1) * 10;
      let discount = await db.Discount.findOne({
        where: {
          id: id,
        },
        // attributes: {
        //   exclude: ["password"],
        // },

        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(discount);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getDetailDiscount,
};
