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
  const bookingDetail = await BookingService.getDetailBookingOfPT(
    req.params.PTId
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail booking of PT is success",
    bookingDetail,
  });
};
const handleGetDetailBookingOfCustomer = async (req, res) => {
  console.log("check id: ", req.params);
  const bookingDetail = await BookingService.getDetailBookingOfCustomer(
    req.params.CustomerId
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail booking of cutomer is success",
    bookingDetail,
  });
};
const handleGetDetailBookingOfCenter = async (req, res) => {
  // console.log("check id: ", req.query);
  const bookingDetail = await BookingService.getDetailBookingOfCenter(
    req.query
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail booking of center is success",
    bookingDetail,
  });
};
const handleGetBookingPending = async (req, res) => {
  // console.log("check id: ", req.query);
  const bookingPending = await BookingService.getBookingPending(req.query);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get booking pending of system is success",
    bookingPending,
  });
};
const handleGetBookingCancel = async (req, res) => {
  // console.log("check id: ", req.query);
  const bookingPending = await BookingService.getBookingPending(req.query);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get booking cancel of system is success",
    bookingPending,
  });
};
const handleGetBookingSchedule = async (req, res) => {
  // console.log("check id: ", req.query);
  const bookingPending = await BookingService.getBookingPending(req.query);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get booking schedule of system is success",
    bookingPending,
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

const handleGetBookingOfCenterIn7Day = async (req, res) => {
  const bookingOfCenter = await BookingService.getAllBookingOfCenterIn7Day(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all booking of center in 7 day is success",
    bookingOfCenter,
    totalPage: Math.ceil(bookingOfCenter.count / 10),
  });
};
const handleGetBookingOfCenterIn30Day = async (req, res) => {
  const bookingOfCenter = await BookingService.getAllBookingOfCenterIn30Day(
    req
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all booking of center in 7 day is success",
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
  handleGetDetailBookingOfCenter,
  handleGetBookingOfCenterIn7Day,
  handleGetBookingOfCenterIn30Day,
  handleGetBookingPending,
  handleGetBookingCancel,
  handleGetBookingSchedule,
  handleGetDetailBookingOfCustomer,
};
