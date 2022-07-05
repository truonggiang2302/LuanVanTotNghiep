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
const getAllCustomer = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let customers = await db.Customer.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(customers);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllCustomerOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check req: ", req.query, req.params);
      const nameInput = req.query.CustomerName;
      // console.log(nameInput);
      const skip = (req.query.page - 1) * 10;
      let customers = await db.Customer.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
          [Op.and]: [
            nameInput && {
              CustomerName: { [op.iLike]: `%${nameInput}%` },
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

      resolve(customers);
    } catch (e) {
      reject(e);
    }
  });
};
let getCustomerByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let customer = await db.Customer.findAll({
        where: { CustomerName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(customer);
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
let createNewCustomer = (data) => {
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

        await db.Customer.create({
          CustomerName: data.fullName,
          Gender: data.gender,
          DayOfBirth: data.dayOfBirth,
          PhoneNumber: data.phoneNumber,
          Address: data.address,
          RoleId: data.roleId,
          // password: hashPass,
          CustomerImage:
            result && result.secure_url ? result.secure_url : avatar,
          CustomerEmail: data.email,
          CenterId: data.centerId,

          // SalaryId: data.salaryId,
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
const updateCustomer = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let customer = await db.Customer.findOne({
        where: { AccountId: data.id },
        raw: false,
      });
      if (customer) {
        customer.CustomerName = data.fullName;
        customer.Gender = data.Gender;
        customer.DayOfBirth = data.DayOfBirth;
        customer.PhoneNumber = data.phoneNumber;
        customer.Address = data.address;
        customer.CustomerEmail = data.email;

        customer.RoleId = data.roleId;
        customer.CustomerImage = data.avatar;
        customer.CenterId = data.centerId;
        // customer.SalaryId = data.salaryId;

        await customer.save();

        resolve({
          errorCode: 0,
          message: "Update customer is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "customer not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("id: ", id);
      // console.log("id: ", typeof id);
      let cus = await db.Customer.findOne({
        where: { id: id },
        include: [
          // { model: db.ScheduleWorking, as: "ScheduleWorkStaff" },
          {
            model: db.Booking,
            as: "CustomerBooking",
            // where: { CustomerId: 41 },
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(cus);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllCustomer,
  getAllCustomerOfCenter,
  getCustomerByName,
  createNewCustomer,
  getDetailCustomer,
  updateCustomer,
};
