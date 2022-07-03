import Customer from "../models/Customer";
import db from "../models/index";
import ManagerService from "../Services/ManagerService";
import UserService from "../Services/UserService";

const handleGetAllManageCenter = async (req, res) => {
  let manager = await ManagerService.getAllManagerOfCenter(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all manage of centers is success",
    manager,
    totalPage: Math.ceil(manager.count / 10),
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
module.exports = {
  handleGetAllManageCenter,
  handleCreateNewManager,
};
