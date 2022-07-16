import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import moment from "moment";
import { Op } from "sequelize";
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const groupBy = (arr, prop) => {
  console.log("prop: ", prop);
  const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
  arr.forEach((obj) => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
};

const getAllSchedule = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var startOfWeek = moment().startOf("week").toDate();
      var endOfWeek = moment().endOf("week").toDate();
      console.log(startOfWeek, endOfWeek);
      startOfWeek = moment(data.StartTime).format("DD-MM-YYYY");
      startOfWeek = startOfWeek.split("-");
      startOfWeek = new Date(
        startOfWeek[2],
        startOfWeek[1] - 1,
        startOfWeek[0]
      );
      startOfWeek = startOfWeek.getTime();
      console.log("startOfWeek: ", startOfWeek);

      endOfWeek = moment(data.EndTime).format("DD-MM-YYYY");
      endOfWeek = endOfWeek.split("-");
      endOfWeek = new Date(endOfWeek[2], endOfWeek[1] - 1, endOfWeek[0]);
      endOfWeek = endOfWeek.getTime();
      console.log("endOfWeek: ", endOfWeek);
      let testTimeS = startOfWeek + 604800000;
      console.log("check end day timestamp: ", testTimeS);
      // const skip = (payloadReq.page - 1) * 10;
      let schedule = await db.ScheduleWorking.findAll({
        // where: {
        //   DayWork: {
        //     [Op.gte]: startOfWeek.toString(),
        //     [Op.lte]: endOfWeek.toString(),
        //   },
        // },
        // attributes: {
        //   exclude: ["id", "updatedAt"],
        // },
        // attributes: ["StaffId"],
        // limit: 10,
        // offset: skip,
        // group: [
        //   "ScheduleWorking.DayWork",
        //   "ScheduleWorking.StaffId",
        //   "ScheduleWorking.TimeId",
        //   "ScheduleWorking.Status",
        //   "ScheduleWorking.createdAt",
        // ],
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      // console.log("schedule: ", schedule);

      // let test = groupBy(schedule, "StaffId");

      // console.log("test: ", test);

      const merged = schedule.reduce((r, { StaffId, ...rest }) => {
        const key = `${StaffId}`;
        r[key] = r[key] || { StaffId, Shiff: [] };
        r[key]["Shiff"].push(rest);
        return r;
      }, {});

      const timeTable = Object.values(merged);
      console.log("timeTable: ", timeTable);

      resolve(timeTable);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllScheduleByWeek = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      var startOfWeek = moment().startOf("week").toDate();
      var endOfWeek = moment().endOf("week").toDate();
      console.log(startOfWeek, endOfWeek);
      startOfWeek = moment(data.StartTime).format("DD-MM-YYYY");
      startOfWeek = startOfWeek.split("-");
      startOfWeek = new Date(
        startOfWeek[2],
        startOfWeek[1] - 1,
        startOfWeek[0]
      );
      startOfWeek = startOfWeek.getTime();
      console.log("startOfWeek: ", startOfWeek);

      endOfWeek = moment(data.EndTime).format("DD-MM-YYYY");
      endOfWeek = endOfWeek.split("-");
      endOfWeek = new Date(endOfWeek[2], endOfWeek[1] - 1, endOfWeek[0]);
      endOfWeek = endOfWeek.getTime();
      console.log("endOfWeek: ", endOfWeek);
      let testTimeS = startOfWeek + 604800000;
      console.log("check end day timestamp: ", testTimeS);
      // const skip = (payloadReq.page - 1) * 10;
      let schedule = await db.ScheduleWorking.findAll({
        where: {
          DayWork: {
            [Op.gte]: startOfWeek.toString(),
            [Op.lte]: endOfWeek.toString(),
          },
        },
        // attributes: {
        //   exclude: ["id", "updatedAt"],
        // },
        // attributes: ["StaffId"],
        // limit: 10,
        // offset: skip,
        // group: [
        //   "ScheduleWorking.DayWork",
        //   "ScheduleWorking.StaffId",
        //   "ScheduleWorking.TimeId",
        //   "ScheduleWorking.Status",
        //   "ScheduleWorking.createdAt",
        // ],
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      // console.log("schedule: ", schedule);

      // let test = groupBy(schedule, "StaffId");

      // console.log("test: ", test);

      const merged = schedule.reduce((r, { StaffId, ...rest }) => {
        const key = `${StaffId}`;
        r[key] = r[key] || { StaffId, Shiff: [] };
        r[key]["Shiff"].push(rest);
        return r;
      }, {});

      const timeTable = Object.values(merged);
      console.log("timeTable: ", timeTable);

      resolve(timeTable);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllScheduleWorkOfStaff = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let scheduleWork = await db.ScheduleWorking.findAndCountAll({
        where: {
          StaffId: req.params.StaffId,
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
  getAllSchedule,
  getAllScheduleWorkOfPT,
  createNewSchedule,
  getAllScheduleWorkOfStaff,
  getAllScheduleByWeek,
};
