import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

import { raw } from "body-parser";
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
const getAllStaff = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let staffs = await db.Staffs.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(staffs);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPT = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let pts = await db.Staffs.findAndCountAll({
        where: {
          RoleId: 3,
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

      resolve(pts);
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailStaffByExternal = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staff = await db.Staffs.findOne({
        where: { ExternalId: id },
        // include: [
        //   { model: db.ScheduleWorking, as: "ScheduleWorkStaff" },
        //   { model: db.Booking, as: "StaffBooking" },
        // ],
        raw: false,
        nest: true,
      });

      resolve(staff);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailPT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staff = await db.Staffs.findOne({
        where: { id: id },
        include: [
          { model: db.ScheduleWorking, as: "ScheduleWorkStaff" },
          { model: db.Booking, as: "StaffBooking" },
        ],
        raw: false,
        nest: true,
      });

      resolve(staff);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllStaffOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.StaffName;
      let staffs = await db.Staffs.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
          [Op.and]: [
            nameInput && {
              StaffName: { [op.iLike]: `%${nameInput}%` },
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

      resolve(staffs);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllPTOfService = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let pts = await db.StaffService.findAndCountAll({
        where: {
          ServiceId: req.query.ServiceId,
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

      resolve(pts);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPTOfCenter = async (page, CenterId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (page - 1) * 10;
      let pts = await db.Staffs.findAndCountAll({
        where: {
          CenterId: CenterId,
          RoleId: 3,
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

      resolve(pts);
    } catch (e) {
      reject(e);
    }
  });
};
let getStaffByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staff = await db.Staffs.findAll({
        where: { StaffName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(staff);
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Staffs.findOne({
        where: { StaffEmail: email },
      });
      if (user) resolve(true);
      else resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewStaff = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email //
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "Email da ton tai",
        });
      } else {
        let hashPass = await hashUserPassword(data.password);
        let result = {};
        let avatar = "";
        if (data.avatar && data.fileName) {
          // upload cloud //
          result = await uploadCloud(data.avatar, data.fileName);
        } else {
          avatar = "";
        }

        await db.Staffs.create({
          StaffName: data.fullName,
          password: hashPass,
          StaffImage: result && result.secure_url ? result.secure_url : avatar,
          StaffPhoneNumber: data.phoneNumber,
          Gender: data.gender,
          DayOfBirth: data.dayOfBirth,
          Address: data.address,
          roleId: data.roleId,
          StaffEmail: data.email,
          CenterId: data.centerId,
          SalaryId: data.salaryId,
          Description: data.Description,
          // isActive: true,
          // userName: data.userName,
        });

        resolve({
          errCode: 0,
          errMessage: "OK",
        }); // return
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateStaff = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let staff = await db.Staffs.findOne({
        where: { AccountId: data.id },
        raw: false,
      });
      if (staff) {
        staff.StaffName = data.fullName;
        staff.StaffEmail = data.email;
        staff.StaffPhoneNumber = data.phoneNumber;
        staff.Gender = data.Gender;
        staff.DayOfBirth = data.DayOfBirth;
        staff.ManagerAddress = data.address;
        staff.RoleId = data.roleId;
        staff.StaffImage = data.avatar;
        staff.CenterId = data.centerId;
        staff.SalaryId = data.salaryId;
        staff.Description = data.Description;
        await staff.save();

        resolve({
          errorCode: 0,
          message: "Update staff is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "staff not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllStaff,
  getDetailPT,
  getAllStaffOfCenter,
  getAllPT,
  getAllPTOfCenter,
  getStaffByName,
  createNewStaff,
  updateStaff,
  getAllPTOfService,
  getDetailStaffByExternal,
};
