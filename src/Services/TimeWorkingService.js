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
const getAllTimeWorking = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let time = await db.TimeWorking.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(time);
    } catch (e) {
      reject(e);
    }
  });
};

const getTimeWorkingById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const skip = (req.query.page - 1) * 10;
      let time = await db.TimeWorking.findOne({
        where: {
          id: id,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        // limit: 10,
        // offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(time);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ScheduleWorking.create({
        DayWork: data.DayWork,
        StaffId: data.StaffId,
        TimeId: data.TimeId,
      });
      resolve({
        errCode: 0,
        errMessage: "create schedule is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllTimeWorking,
  getTimeWorkingById,
};
