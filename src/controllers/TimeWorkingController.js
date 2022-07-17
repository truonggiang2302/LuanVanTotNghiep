import Customer from "../models/Customer";
import db from "../models/index";
import TimeWorkingService from "../Services/TimeWorkingService";

const handleGetAllTimeWorking = async (req, res) => {
  let time = await TimeWorkingService.getAllTimeWorking(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all time working is success",
    time,
    totalPage: Math.ceil(time.count / 10),
  });
};

let handleCreateScheduleWorking = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await ScheduleWorkingService.createNewSchedule(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
const handleGetTimeWorkingById = async (req, res) => {
  const time = await TimeWorkingService.getTimeWorkingById(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get time working of id is success",
    time,
    // totalPage: Math.ceil(ScheduleWorking.count / 10),
  });
};

let handleCreateTimeWorking = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await TimeWorkingService.createNewTimeWorking(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};

const handleUpdateTimeWorking = async (req, res) => {
  let data = req.body;
  let message = await TimeWorkingService.updateTimeWorking(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};

let handleDeleteTimeWorking = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await TimeWorkingService.deleteTimeWorking(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};
module.exports = {
  handleGetAllTimeWorking,
  handleGetTimeWorkingById,
  handleCreateTimeWorking,
  handleUpdateTimeWorking,
  handleDeleteTimeWorking,
};
