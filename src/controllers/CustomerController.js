import Customer from "../models/Customer";
import db from "../models/index";
import CustomerService from "../Services/CustomerService";
import UserService from "../Services/UserService";

const handleGetAllCustomer = async (req, res) => {
  let customers = await CustomerService.getAllCustomer(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all customers is success",
    customers,
    totalPage: Math.ceil(customers.count / 10),
  });
};
const handleGetAllCustomerOfCenter = async (req, res) => {
  // console.log(req);
  let customerOfCenter = await CustomerService.getAllCustomerOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all customer of center is success",
    customerOfCenter,
    totalPage: Math.ceil(customerOfCenter.count / 10),
  });
};
const handleGetCustomerByName = async (req, res) => {
  let customerName = req.query.customerName;
  if (customerName) {
    let customer = await CustomerService.getCustomerByName(customerName);
    return res.status(200).json({
      customer,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising name",
    });
  }
};
const handleGetDetailCustomer = async (req, res) => {
  // console.log("check id: ", req.query);
  const cusDetail = await CustomerService.getDetailCustomer(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail customer is success",
    cusDetail,
  });
};
let handleCreateNewCustomer = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await CustomerService.createNewCustomer(req.body);
  let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    messageCreateAccount,
  });
};
module.exports = {
  handleGetAllCustomer,
  handleGetAllCustomerOfCenter,
  handleGetCustomerByName,
  handleCreateNewCustomer,
  handleGetDetailCustomer,
};
