import Customer from "../models/Customer";
import db from "../models/index";
import ScheduleWorkingService from "../Services/ScheduleWorkingService";

const handleGetAllSchedule = async (req, res) => {
  let schedule = await ScheduleWorkingService.getAllSchedule(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all schedule working is success",
    schedule,
    // totalPage: Math.ceil(schedule.count / 10),
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
const handleGetScheduleWorkingOfPT = async (req, res) => {
  const ScheduleWorking = await ScheduleWorkingService.getAllScheduleWorkOfPT(
    req
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all schedule working of pt is success",
    ScheduleWorking,
    totalPage: Math.ceil(ScheduleWorking.count / 10),
  });
};
const handleGetScheduleWorkingOfStaff = async (req, res) => {
  const ScheduleWorking =
    await ScheduleWorkingService.getAllScheduleWorkOfStaff(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all schedule working of staff is success",
    ScheduleWorking,
    totalPage: Math.ceil(ScheduleWorking.count / 10),
  });
};
module.exports = {
  handleGetAllSchedule,
  handleGetScheduleWorkingOfPT,
  handleCreateScheduleWorking,
  handleGetScheduleWorkingOfStaff,
};
