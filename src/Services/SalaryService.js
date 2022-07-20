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
const getAllSalary = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let salary = await db.Salary.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(salary);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewSalary = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Salary.create({
        Salary: data.Salary,
      });
      resolve({
        errCode: 0,
        errMessage: "create salary is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateSalary = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let salary = await db.Salary.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (salary) {
        // console.log("check result: ", result);
        salary.Salary = data.Salary;

        await salary.save();

        resolve({
          errorCode: 0,
          message: "Update salary is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "salary not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteSalary = (id) => {
  return new Promise(async (resolve, reject) => {
    let salary = await db.Salary.findOne({
      where: { id: id },
    });
    if (!salary) {
      resolve({
        errCode: 2,
        errMessage: "Salary not found",
      });
    }
    let salaryInStaff = await db.Staffs.findOne({
      where: { SalaryId: id },
    });
    if (salaryInStaff) {
      resolve({
        errCode: 10,
        errMessage: "Mức lương đang áp dụng cho nhân viên. Không thể xoá",
      });
    }
    if (!salaryInStaff) {
      await db.Salary.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete salary is success",
      });
    }
  });
};
module.exports = {
  getAllSalary,
  createNewSalary,
  updateSalary,
  deleteSalary,
};
