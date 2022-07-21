import Customer from "../models/Customer";
import db from "../models/index";
import SalaryService from "../Services/SalaryService";

const handleGetAllSalary = async (req, res) => {
  let salary = await SalaryService.getAllSalary(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all salary is success",
    salary,
    totalPage: Math.ceil(salary.count / 10),
  });
};

const handleGetDetailSalary = async (req, res) => {
  let salary = await SalaryService.getDetailSalary(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all salary is success",
    salary,
  });
};
let handleCreateNewSalary = async (req, res) => {
  // console.log("check body: ", req.body);
  let message = await SalaryService.createNewSalary(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
const handleUpdateSalary = async (req, res) => {
  let data = req.body;
  let message = await SalaryService.updateSalary(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
let handleDeleteSalary = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await SalaryService.deleteSalary(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};
module.exports = {
  handleGetAllSalary,
  handleCreateNewSalary,
  handleUpdateSalary,
  handleDeleteSalary,
  handleGetDetailSalary,
};
