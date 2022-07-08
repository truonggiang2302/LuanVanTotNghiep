import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
import moment from "moment";

require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllBlog = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let blogs = await db.Blog.findAndCountAll({
        // where: {
        //   CenterId: req.query.CenterId,
        // },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,

        raw: true,
        nest: true,
      });

      resolve(blogs);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBlog,
};
