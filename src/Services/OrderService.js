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
const getAllOrder = async (payloadReq) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (payloadReq.page - 1) * 10;
      let order = await db.Order.findAndCountAll({
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [{ model: db.Roles, as: "UserRoles" }],
        raw: true,
        nest: true,
      });

      resolve(order);
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailOrder = (bookingId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { ReservationId: bookingId },

        raw: false,
        nest: true,
      });

      resolve(order);
    } catch (e) {
      reject(e);
    }
  });
};
// const updateStatusBooking = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.bookingId) {
//         resolve({
//           errorCode: 2,
//           errMessage: "Missing id",
//         });
//       }
//       let booking = await db.Booking.findOne({
//         where: { id: data.bookingId },
//         raw: false,
//       });
//       if (booking) {
//         // booking.CustomerId = data.firstName;
//         // booking.PTId = data.lastName;
//         // booking.CustomerName = data.address;
//         // booking.PTName = data.roleId;
//         // booking.CenterId = data.positionId;
//         // booking.ServiceId = data.gender;
//         // booking.StartTime = data.phonenumber;
//         // booking.EndTime = data.gender;
//         booking.Status = data.Status;
//         // if (data.avatar)
//         //     user.image = data.avatar;

//         await booking.save();

//         resolve({
//           errorCode: 0,
//           message: "Accept booking is success",
//         });
//       } else {
//         resolve({
//           errorCode: 1,
//           errMessage: "booking not found",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
let createNewOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        CustomerId: data.CustomerId,
        // CustomerName: data.CustomerName,
        ReservationId: data.bookingId,
        amount: data.Price,
        Status: 0,
      });
      resolve({
        errCode: 0,
        errMessage: "create order is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
const updateStatusPaidOrder = (id) => {};
module.exports = {
  createNewOrder,
  getAllOrder,
  getDetailOrder,
};
