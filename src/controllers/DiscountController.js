import Customer from "../models/Customer";
import db from "../models/index";
import DiscountService from "../Services/DiscountService";

const handleGetAllDiscount = async (req, res) => {
  let discount = await DiscountService.getAllDiscount(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all discount is success",
    discount,
    totalPage: Math.ceil(discount.count / 10),
  });
};
const handleGetDetailDiscount = async (req, res) => {
  let discount = await DiscountService.getDetailDiscount(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail discount is success",
    discount,
    // totalPage: Math.ceil(schedule.count / 10),
  });
};
let handleCreateNewDiscount = async (req, res) => {
  // console.log("check body: ", req.body);
  let message = await DiscountService.createNewDiscount(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
const handleUpdateDiscount = async (req, res) => {
  let data = req.body;
  let message = await DiscountService.updateDiscount(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
let handleDeleteDiscount = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await DiscountService.deleteDiscount(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};

module.exports = {
  handleGetDetailDiscount,
  handleGetAllDiscount,
  handleCreateNewDiscount,
  handleUpdateDiscount,
  handleDeleteDiscount,
};
