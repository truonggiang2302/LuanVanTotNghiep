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
const getAllBooking = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let booking = await db.Booking.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(booking);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllScheduleWorkOfPT = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let scheduleWork = await db.ScheduleWorking.findAndCountAll({
        where: {
          StaffId: req.params.StaffId,
          DayWork: req.query.DayWork,
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

      resolve(scheduleWork);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllScheduleWorkOfPT,
};
