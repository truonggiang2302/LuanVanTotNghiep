import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
import moment from "moment";

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

const getAllBookingOfPT = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let staffs = await db.Booking.findAndCountAll({
        where: {
          StaffId: req.params.PTId,
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
const getAllBookingOfCustomer = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let bookingOfCus = await db.Booking.findAndCountAll({
        where: {
          CustomerId: req.params.CustomerId,
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        include: [{ model: db.Customer, as: "CustomerBooking" }],
        raw: true,
        nest: true,
      });

      resolve(bookingOfCus);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllBookingOfCenter = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      const nameInput = req.query.name;
      let bookings = await db.Booking.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
          [Op.or]: [
            nameInput && {
              CustomerName: { [op.iLike]: `%${nameInput}%` },
              // PTName: { [op.iLike]: `%${nameInput}%` },
              // Status: { [op.iLike]: `%${nameInput}%` },
            },
            {
              PTName: { [op.iLike]: `%${nameInput}%` },
            },
          ],
        },
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        include: [
          { model: db.Staffs, as: "StaffBooking" },
          { model: db.Customer, as: "CustomerBooking" },
        ],
        raw: true,
        nest: true,
      });

      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
// shops.findAndCountAll({
//   where: {
//     createdAt: {
//       [Op.gte]: moment().subtract(7, 'days').toDate()
//     }
//   }
// })
const getAllBookingOfCenterIn30Day = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let bookings = await db.Booking.findAndCountAll({
        where: {
          // CenterId: req.params.CenterId,
          createdAt: {
            [Op.gte]: moment().subtract(30, "days").toDate(),
          },
        },
        group: ["id", "createdAt"],
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [
        //   { model: db.Staffs, as: "StaffBooking" },
        //   { model: db.Customer, as: "CustomerBooking" },
        // ],
        raw: true,
        nest: true,
      });
      console.log(bookings);
      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
const getAllBookingOfCenterIn7Day = async (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const skip = (req.query.page - 1) * 10;
      let bookings = await db.Booking.findAndCountAll({
        where: {
          CenterId: req.params.CenterId,
          createdAt: {
            [Op.gte]: moment().subtract(7, "days").toDate(),
          },
        },
        group: ["id", "createdAt"],
        // attributes: {
        //   exclude: ["password"],
        // },
        limit: 10,
        offset: skip,
        // include: [
        //   { model: db.Staffs, as: "StaffBooking" },
        //   { model: db.Customer, as: "CustomerBooking" },
        // ],
        raw: true,
        nest: true,
      });
      console.log(bookings);
      resolve(bookings);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailBookingOfPT = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOfPT = await db.Booking.findOne({
        where: { StaffId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(bookingOfPT);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailBookingOfCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOfCus = await db.Booking.findOne({
        where: { CustomerId: id },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(bookingOfCus);
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailBookingOfCenter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOfPT = await db.Booking.findOne({
        where: { id: data.id, CenterId: data.CenterId },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(bookingOfPT);
    } catch (e) {
      reject(e);
    }
  });
};
const getBookingPending = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let bookingOfStatus = await db.Booking.findAndCountAll({
        where: { Status: query.Status },
        // include: [
        //     { model: db.Artists, as: 'SongOfArtists' },
        //     { model: db.Genres, as: 'GenresSong', attributes: ['id', 'genresName'] },
        // ],
        raw: false,
        nest: true,
      });

      resolve(bookingOfStatus);
    } catch (e) {
      reject(e);
    }
  });
};
const updateStatusBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.bookingId) {
        resolve({
          errorCode: 2,
          errMessage: "Missing id",
        });
      }
      let booking = await db.Booking.findOne({
        where: { id: data.bookingId },
        raw: false,
      });
      if (booking) {
        // booking.CustomerId = data.firstName;
        // booking.PTId = data.lastName;
        // booking.CustomerName = data.address;
        // booking.PTName = data.roleId;
        // booking.CenterId = data.positionId;
        // booking.ServiceId = data.gender;
        // booking.StartTime = data.phonenumber;
        // booking.EndTime = data.gender;
        booking.Status = data.Status;

        // if (data.avatar)
        //     user.image = data.avatar;

        await booking.save();
        if (data.Status === "SCHEDULED") {
          let scheduleWork = await db.ScheduleWorking.findOne({
            where: { id: data.ScheduleId },
            raw: false,
          });
          if (scheduleWork) {
            // console.log("first");
            scheduleWork.Status = 0;
            scheduleWork.save();
            resolve({
              errorCode: 0,
              message: "change status work success",
            });
          }
        }
        if (data.Status === "CANCELED") {
          let scheduleWork = await db.ScheduleWorking.findOne({
            where: { id: data.ScheduleId },
            raw: false,
          });
          if (scheduleWork) {
            scheduleWork.Status = 1;
            scheduleWork.save();
          }
          // await db.ScheduleWorking.destroy({
          //   where: { id: data.ScheduleId },
          // });
        }
        resolve({
          errorCode: 0,
          message: "success",
        });
      } else {
        resolve({
          errorCode: 1,
          errMessage: "booking not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Booking.create({
        CustomerId: data.CustomerId,
        StaffId: data.PTId,
        CustomerName: data.CustomerName,
        PTName: data.PTName,
        CenterId: data.CenterId,
        ServiceId: data.ServiceId,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        Status: "PENDING",
        idDiscount: data.IdDisCount,
        price: data.Price,
        ScheduleId: data.ScheduleId,
      });
      resolve({
        errCode: 0,
        errMessage: "create booking is success",
      }); // return
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllBooking,
  getDetailBookingOfPT,
  getDetailBookingOfCenter,
  getAllBookingOfPT,
  getAllBookingOfCustomer,
  getAllBookingOfCenter,
  updateStatusBooking,
  createNewBooking,
  getAllBookingOfCenterIn7Day,
  getAllBookingOfCenterIn30Day,
  getBookingPending,
  getDetailBookingOfCustomer,
};
