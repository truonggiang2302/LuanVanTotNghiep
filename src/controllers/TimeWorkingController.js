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
module.exports = {
  handleGetAllTimeWorking,
};
