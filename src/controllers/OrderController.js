import Customer from "../models/Customer";
import db from "../models/index";
import OrderService from "../Services/OrderService";

let handleCreateNewOrder = async (req, res) => {
  console.log("check body: ", req.body);

  let messageCreateOrder = await OrderService.createNewOrder(req.body);
  return res.status(200).json({
    messageCreateOrder,
  });
};

const handleGetAllOrder = async (req, res) => {
  let order = await OrderService.getAllOrder(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all orders is success",
    order,
    totalPage: Math.ceil(order.count / 10),
  });
};
const handleGetDetailOrder = async (req, res) => {
  let order = await OrderService.getDetailOrder(req.query.bookingId);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail order is success",
    order,
  });
};
const handleUpdateOrder = async (req, res) => {
  let data = req.body;
  let message = await OrderService.updateStatusPaidOrder(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
// const handleGetDetailBookingOfPT = async (req, res) => {
//   // console.log("check id: ", req.query);
//   const bookingDetail = await BookingService.getDetailBookingOfPT(req.query.id);

//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "get detail booking of PT is success",
//     bookingDetail,
//   });
// };
// const handleGetBookingOfPT = async (req, res) => {
//   const bookingOfPT = await BookingService.getAllBookingOfPT(req);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "get all booking of pt is success",
//     bookingOfPT,
//     totalPage: Math.ceil(bookingOfPT.count / 10),
//   });
// };
// const handleGetBookingOfCenter = async (req, res) => {
//   const bookingOfCenter = await BookingService.getAllBookingOfCenter(req);
//   return res.status(200).json({
//     errCode: 0,
//     errMessage: "get all booking of center is success",
//     bookingOfCenter,
//     totalPage: Math.ceil(bookingOfCenter.count / 10),
//   });
// };
// const handleAcceptBookingForStaff = async (req, res) => {
//   let data = req.body;
//   let message = await BookingService.updateStatusBooking(data);
//   return res.status(200).json(message)
// }
module.exports = {
  handleCreateNewOrder,
  handleGetAllOrder,
  handleGetDetailOrder,
  handleUpdateOrder,
};
