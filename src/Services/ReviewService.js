import db, { sequelize } from "../models/index";
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

const getAllReviewOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let bookings = await db.rateAndReview.findAndCountAll({
        where: {
          CenterId: req.query.CenterId,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,

        raw: true,
        nest: true,
      });

      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
const get5ReviewOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const skip = (req.query.page - 1) * 10;
      let bookings = await db.rateAndReview.findAndCountAll({
        where: {
          CenterId: req.query.CenterId,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 5,
        // offset: skip,
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });

      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staffId = "";
      if (data.StaffId) {
        staffId = data.StaffId;
      } else {
        staffId = null;
      }
      await db.rateAndReview.create({
        ratingPoint: data.ratingPoint,
        reviewContent: data.reviewContent,
        CustomerId: data.CustomerId,
        StaffId: staffId,
        CenterId: data.CenterId,
        Status: data.Status,
      });
      resolve({
        errCode: 0,
        errMessage: "create review is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateReview = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let review = await db.rateAndReview.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (review) {
        // console.log("check result: ", result);
        review.ratingPoint = data.ratingPoint;
        review.reviewContent = data.reviewContent;

        // service.fileName = data.fileName;
        await review.save();

        resolve({
          errorCode: 0,
          message: "Update review is success",
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
const hideShowReview = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let review = await db.rateAndReview.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (review) {
        // console.log("check result: ", result);
        review.Status = data.Status;
        // review.reviewContent = data.reviewContent;

        // service.fileName = data.fileName;
        await review.save();

        resolve({
          errorCode: 0,
          message: "Hide review is success",
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
let deleteReview = (id) => {
  return new Promise(async (resolve, reject) => {
    let review = await db.rateAndReview.findOne({
      where: { id: id },
    });
    if (!review) {
      resolve({
        errCode: 2,
        errMessage: "review not found",
      });
    }
    await db.rateAndReview.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete service is success",
    });
  });
};
module.exports = {
  getAllReviewOfCenter,
  createNewReview,
  updateReview,
  deleteReview,
  hideShowReview,
  get5ReviewOfCenter,
};
