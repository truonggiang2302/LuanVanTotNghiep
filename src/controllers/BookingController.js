import Customer from "../models/Customer";
import db from "../models/index";
import BookingService from "../Services/BookingService";
import OrderService from "../Services/OrderService";

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
const handleGetBookingOfCustomer = async (req, res) => {
  const bookingOfCus = await BookingService.getAllBookingOfCustomer(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all booking of customer is success",
    bookingOfCus,
    totalPage: Math.ceil(bookingOfCus.count / 10),
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
  let message = await BookingService.updateStatusBooking(data); //khi bam accept phai truyen vao body {status:SCHEDULED hoac IN_PROCESS(neu đã tới thời gian)+bookingId+CustomerId,CustomerName,bookingId(của booking),amount}
  let messageCreateOrder = await OrderService.createNewOrder(data);
  return res.status(200).json({ message, messageCreateOrder });
};

const handleCancelBookingForStaff = async (req, res) => {
  let data = req.body;
  let message = await BookingService.updateStatusBooking(data); //khi bam accept phai truyen vao body {status:SCHEDULED hoac IN_PROCESS(neu đã tới thời gian)+bookingId}

  return res.status(200).json({ message });
};
let handleCreateNewBooking = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await BookingService.createNewBooking(req.body);
  // let messageCreateOrder = await OrderService.createNewOrder(req.body);
  return res.status(200).json({
    message,
    // messageCreateOrder,
  });
};
module.exports = {
  handleGetAllBooking,
  handleGetDetailBookingOfPT,
  handleGetBookingOfPT,
  handleGetBookingOfCenter,
  handleAcceptBookingForStaff,
  handleCreateNewBooking,
  handleCancelBookingForStaff,
  handleGetBookingOfCustomer,
};
