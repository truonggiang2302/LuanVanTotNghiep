import Customer from "../models/Customer";
import db from "../models/index";
import ManagerService from "../Services/ManagerService";
import UserService from "../Services/UserService";

const handleGetAllManageCenter = async (req, res) => {
  let manager = await ManagerService.getAllManagerOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all manage of centers is success",
    manager,
    totalPage: Math.ceil(manager.count / 10),
  });
};
const handleGetDetailManager = async (req, res) => {
  // console.log("check id: ", req.query);
  const managerDetail = await ManagerService.getDetailManager(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail manager is success",
    managerDetail,
  });
};
let handleCreateNewManager = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await ManagerService.createNewManager(req.body);
  let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    messageCreateAccount,
  });
};
const handleUpdateManager = async (req, res) => {
  let data = req.body;
  let message = await ManagerService.updateManager(data);
  let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json({ message, messageUpdateAccount });
};
let handleDeleteManager = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await ManagerService.deleteManager(req.body.id);
  let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message, messageDeleteAccount });
};
module.exports = {
  handleGetAllManageCenter,
  handleCreateNewManager,
  handleUpdateManager,
  handleDeleteManager,
  handleGetDetailManager,
};
