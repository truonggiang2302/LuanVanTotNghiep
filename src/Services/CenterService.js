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
let createNewCenter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let avatar = "";
      if (data.CenterImage && data.fileName) {
        // upload cloud //
        // console.log("first");
        result = await uploadCloud(data.CenterImage, data.fileName);
      } else {
        avatar = "";
      }
      await db.GymCenter.create({
        CenterName: data.CenterName,
        CenterImage: result && result.secure_url ? result.secure_url : avatar,
        public_id_image: data.fileName,
        CenterAddress: data.CenterAddress,
        CenterPhoneNumber: data.CenterPhoneNumber,
        ManagerId: data.ManagerId,
        Status: data.Status,
      });
      resolve({
        errCode: 0,
        errMessage: "create center is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateCenter = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let center = await db.GymCenter.findOne({
        where: { id: data.id },
        raw: false,
      });
      let result = {};
      let avatar = center.CenterImage;
      if (data.CenterImage && data.fileName) {
        // upload cloud //
        // console.log("first");
        result = await uploadCloud(data.CenterImage, data.fileName);
      } else {
        avatar = center.CenterImage;
      }
      if (center) {
        // console.log("check result: ", result);
        center.CenterName = data.CenterName;
        center.CenterImage =
          result && result.secure_url ? result.secure_url : avatar;
        center.public_id_image = data.fileName;
        center.CenterAddress = data.CenterAddress;
        center.CenterPhoneNumber = data.CenterPhoneNumber;
        center.ManagerId = data.ManagerId;
        center.Status = data.Status;
        // service.fileName = data.fileName;
        await center.save();

        resolve({
          errorCode: 0,
          message: "Update center is success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "center not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteService = (id) => {
  return new Promise(async (resolve, reject) => {
    let service = await db.Services.findOne({
      where: { id: id },
    });
    if (!service) {
      resolve({
        errCode: 2,
        errMessage: "Service not found",
      });
    }
    let serviceInBooking = await db.Booking.findOne({
      where: { ServiceId: id },
    });
    if (serviceInBooking) {
      resolve({
        errCode: 10,
        errMessage: "Service đang thuộc 1 booking. Không thể xoá",
      });
    }
    if (!serviceInBooking) {
      await db.Services.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete service is success",
      });
    }
  });
};
const getAllCenter = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (data.page - 1) * 10;
      const nameInput = data.CenterName;
      let center = await db.GymCenter.findAndCountAll({
        where: {
          // Status: 1,
          [Op.and]: [
            nameInput && {
              CenterName: { [op.iLike]: `%${nameInput}%` },
            },
          ],
        },
        limit: 10,
        offset: skip,
        raw: true,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailCenter = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let center = await db.GymCenter.findOne({
        where: { id: id },

        raw: false,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
let getCenterByName = (nameInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let center = await db.GymCenter.findAll({
        where: { CenterName: { [op.iLike]: `%${nameInput}%` } },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(center);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllCenter,
  getDetailCenter,
  getCenterByName,
  createNewCenter,
  updateCenter,
};
