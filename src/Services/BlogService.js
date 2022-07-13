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
let uploadCloud = (image, fName) => {
  return new Promise(async (resolve, reject) => {
    try {
      await cloudinary.uploader.upload(
        image,
        {
          resource_type: "raw",
          public_id: `image/GhGym/${fName}`,
        },
        // Send cloudinary response or catch error
        (err, result) => {
          if (err) console.log(err);
          if (result) {
            resolve(result);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};
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
let createNewBlog = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let avatar = "";
      if (data.BlogImage && data.fileName) {
        // upload cloud //
        // console.log("first");
        result = await uploadCloud(data.BlogImage, data.fileName);
      } else {
        avatar = "";
      }
      await db.Blog.create({
        Title: data.title,
        Content: data.content,
        BlogImage: result && result.secure_url ? result.secure_url : avatar,
        public_id_image: data.fileName,
        ManagerId: data.managerId,
        CenterId: data.centerId,
      });
      resolve({
        errCode: 0,
        errMessage: "create Blog is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateService = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let service = await db.Services.findOne({
        where: { id: data.id },
        raw: false,
      });
      let result = {};
      let avatar = "";
      if (data.ServiceImage && data.fileName) {
        // upload cloud //
        console.log("first");
        result = await uploadCloud(data.ServiceImage, data.fileName);
      } else {
        avatar = service.ServiceImage;
      }
      if (service) {
        console.log("check result: ", result);
        service.ServiceName = data.ServiceName;
        service.WorkDuration = data.WorkDuration;
        service.Price = data.Price;
        service.ServiceImage =
          result && result.secure_url ? result.secure_url : avatar;
        service.public_id_image = data.fileName;
        // service.fileName = data.fileName;
        await service.save();

        resolve({
          errorCode: 0,
          message: "Update service is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "service not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBlog,
  createNewBlog,
};
