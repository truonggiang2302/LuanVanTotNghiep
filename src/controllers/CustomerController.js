import Customer from "../models/Customer";
import db from "../models/index";
import CustomerService from "../Services/CustomerService";

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
module.exports = {
  handleGetAllCustomer,
  handleGetAllCustomerOfCenter,
  handleGetCustomerByName,
};
