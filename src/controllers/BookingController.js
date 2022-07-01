import Customer from "../models/Customer";
import db from "../models/index";
import BookingService from "../Services/BookingService";

const handleGetAllBooking = async (req, res) => {
  let bookings = await BookingService.getAllBooking(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all bookings is success",
    bookings,
    totalPage: Math.ceil(bookings.count / 10),
  });
};
const handleGetDetailBookingOfPT = async (req, res) => {
  // console.log("check id: ", req.query);
  const bookingDetail = await BookingService.getDetailBookingOfPT(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail booking of PT is success",
    bookingDetail,
  });
};
const handleGetBookingOfPT = async (req, res) => {
  const bookingOfPT = await BookingService.getAllBookingOfPT(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all booking of pt is success",
    bookingOfPT,
    totalPage: Math.ceil(bookingOfPT.count / 10),
  });
};
const handleGetBookingOfCenter = async (req, res) => {
  const bookingOfCenter = await BookingService.getAllBookingOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all booking of center is success",
    bookingOfCenter,
    totalPage: Math.ceil(bookingOfCenter.count / 10),
  });
};
const handleAcceptBookingForStaff = async (req, res) => {
  let data = req.body;
  let message = await BookingService.updateStatusBooking(data);
  return res.status(200).json(message)
}
module.exports = {
  handleGetAllBooking,
  handleGetDetailBookingOfPT,
  handleGetBookingOfPT,
  handleGetBookingOfCenter,
  handleAcceptBookingForStaff
};
