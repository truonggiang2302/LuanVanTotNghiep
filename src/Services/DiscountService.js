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
const getAllDiscount = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.DiscountRate;
      let discount = await db.Discount.findAndCountAll({
        where: {
          [Op.and]: [
            nameInput && {
              DiscountRate: { [op.iLike]: `%${nameInput}%` },
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

      resolve(discount);
    } catch (e) {
      reject(e);
    }
  });
};
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
let createNewDiscount = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Discount.create({
        DiscountRate: data.DiscountRate,
      });
      resolve({
        errCode: 0,
        errMessage: "create discount is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateDiscount = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let discount = await db.Discount.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (discount) {
        // console.log("check result: ", result);
        discount.DiscountRate = data.DiscountRate;

        await discount.save();

        resolve({
          errorCode: 0,
          message: "Update discount is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "discount not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteDiscount = (id) => {
  return new Promise(async (resolve, reject) => {
    let discount = await db.Discount.findOne({
      where: { id: id },
    });
    if (!discount) {
      resolve({
        errCode: 2,
        errMessage: "Discount not found",
      });
    }
    let discountInBooking = await db.Services.findOne({
      where: { idDiscount: id },
    });
    if (discountInBooking) {
      resolve({
        errCode: 10,
        errMessage: "Discount đang thuộc 1 Service. Không thể xoá",
      });
    }
    if (!discountInBooking) {
      await db.Discount.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete discount is success",
      });
    }
  });
};
module.exports = {
  getDetailDiscount,
  getAllDiscount,
  createNewDiscount,
  updateDiscount,
  deleteDiscount,
};
