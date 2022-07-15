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
const getDetailBlog = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const skip = (req.query.page - 1) * 10;
      let blog = await db.Blog.findOne({
        where: {
          id: id,
        },
        // attributes: {
        //   exclude: ["password"],
        // },

        raw: true,
        nest: true,
      });

      resolve(blog);
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
const updateBlog = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let blog = await db.Blog.findOne({
        where: { id: data.id },
        raw: false,
      });
      let result = {};
      let avatar = "";
      if (data.BlogImage && data.fileName) {
        // upload cloud //
        // console.log("first");
        result = await uploadCloud(data.BlogImage, data.fileName);
      } else {
        avatar = blog.BlogImage;
      }
      if (blog) {
        // console.log("check result: ", result);
        blog.Title = data.title;
        blog.BlogImage =
          result && result.secure_url ? result.secure_url : avatar;
        blog.public_id_image = data.fileName;
        blog.Content = data.Content;
        blog.CenterId = data.CenterId;
        await blog.save();

        resolve({
          errorCode: 0,
          message: "Update blog is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "blog not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    let blog = await db.Blog.findOne({
      where: { id: id },
    });
    if (!blog) {
      resolve({
        errCode: 2,
        errMessage: "blog not found",
      });
    }
    await db.Blog.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete blog is success",
    });
  });
};
module.exports = {
  getAllBlog,
  createNewBlog,
  deleteBlog,
  updateBlog,
  getDetailBlog,
};
