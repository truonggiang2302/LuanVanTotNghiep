import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
const Sequelize = require("sequelize");

import { Op } from "sequelize";
require("dotenv").config();

var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const op = Sequelize.Op;

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
const getAllManagerOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.ManagerName;
      let managerCenter = await db.Manager.findAndCountAll({
        where: {
          [Op.and]: [
            nameInput && {
              ManagerName: { [op.iLike]: `%${nameInput}%` },
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

      resolve(managerCenter);
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
let createNewManager = (data) => {
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
        // console.log("first");
        let hashPass = await hashUserPassword(data.password);
        let result = {};
        let avatar = "";

        if (data.avatar && data.fileName) {
          // upload cloud //

          result = await uploadCloud(data.avatar, data.fileName);
          console.log("check image: ", result);
        } else {
          avatar = "";
        }

        await db.Manager.create({
          id: data.id,
          ManagerName: data.fullName,
          // password: hashPass,
          ManagerEmail: data.email,

          ManagerPhone: data.phoneNumber,
          Gender: data.gender,
          // DayOfBirth: data.dayOfBirth,
          ManagerAddress: data.address,
          RoleId: data.roleId,
          ManagerImage:
            result && result.secure_url ? result.secure_url : avatar,
          public_id_image: data.fileName,
          CenterId: data.centerId,
          SalaryId: data.salaryId,

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
const updateManager = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let manager = await db.Manager.findOne({
        where: { AccountId: data.id },
        raw: false,
      });
      let result = {};
      let avatar = "";
      if (data.avatar && data.fileName) {
        // upload cloud //

        result = await uploadCloud(data.avatar, data.fileName);
        console.log("check image: ", result);
      } else {
        avatar = "";
      }
      if (manager) {
        manager.ManagerName = data.fullName;
        manager.ManagerEmail = data.email;
        manager.ManagerPhone = data.phoneNumber;
        manager.Gender = data.Gender;
        manager.ManagerAddress = data.address;
        manager.RoleId = data.roleId;
        manager.ManagerImage =
          result && result.secure_url ? result.secure_url : avatar;
        manager.public_id_image = data.fileName;
        manager.CenterId = data.centerId;
        manager.SalaryId = data.salaryId;

        await manager.save();

        resolve({
          errorCode: 0,
          message: "Update manager is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "manager not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteManager = (id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Manager.findOne({
      where: { id: id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "Manager not found",
      });
    }

    // if (user.avatar && user.public_id_image) {
    //     // Xóa hình cũ //
    //     await cloudinary.uploader.destroy(user.public_id_image, { invalidate: true, resource_type: "raw" },
    //         function (err, result) { console.log(result) });
    // }

    await db.Manager.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete manager is success",
    });
  });
};
const getDetailManager = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("id: ", id);
      // console.log("id: ", typeof id);
      let manager = await db.Manager.findOne({
        where: { ExternalId: id },
        // include: [
        //   // { model: db.ScheduleWorking, as: "ScheduleWorkStaff" },
        //   // {
        //   //   model: db.Booking,
        //   //   as: "CustomerBooking",
        //   //   // where: { CustomerId: 41 },
        //   // },
        // ],
        raw: false,
        nest: true,
      });

      resolve(manager);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllManagerOfCenter,
  createNewManager,
  updateManager,
  deleteManager,
  getDetailManager,
};
