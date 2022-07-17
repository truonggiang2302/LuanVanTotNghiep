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
      const skip = (payloadReq.page - 1) * 20;
      let time = await db.TimeWorking.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 20,
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

let createNewTimeWorking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TimeWorking.create({
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        // TimeId: data.TimeId,
      });
      resolve({
        errCode: 0,
        errMessage: "create time working is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateTimeWorking = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let time = await db.TimeWorking.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (time) {
        // console.log("check result: ", result);
        time.StartTime = data.StartTime;
        time.EndTime = data.EndTime;

        // service.fileName = data.fileName;
        await time.save();

        resolve({
          errorCode: 0,
          message: "Update time working is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "time working not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteTimeWorking = (id) => {
  return new Promise(async (resolve, reject) => {
    let time = await db.TimeWorking.findOne({
      where: { id: id },
    });
    if (!time) {
      resolve({
        errCode: 2,
        errMessage: "Time working not found",
      });
    }
    let timeInSchedule = await db.ScheduleWorking.findOne({
      where: { TimeId: id },
    });
    if (timeInSchedule) {
      resolve({
        errCode: 10,
        errMessage: "Time working đang thuộc 1 schedule working. Không thể xoá",
      });
    }
    if (!timeInSchedule) {
      await db.TimeWorking.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete time working is success",
      });
    }
  });
};
module.exports = {
  getAllTimeWorking,
  getTimeWorkingById,
  createNewTimeWorking,
  updateTimeWorking,
  deleteTimeWorking,
};
