import Staff from "../models/Staff";
import db from "../models/index";
import StaffService from "../Services/StaffService";

const handleGetAllStaff = async (req, res) => {
  let staffs = await StaffService.getAllStaff(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all staff is success",
    staffs,
    totalPage: Math.ceil(staffs.count / 10),
  });
};
const handleGetPTDetail = async (req, res) => {
  // console.log("check id: ", req.query);
  const staffDetail = await StaffService.getDetailPT(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail pt is success",
    staffDetail,
  });
};
const handleGetAllStaffOfCenter = async (req, res) => {
  let staffOfCenter = await StaffService.getAllStaffOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all staff of center is success",
    staffOfCenter,
    totalPage: Math.ceil(staffOfCenter.count / 10),
  });
};
const handleGetAllPT = async (req, res) => {
  let pts = await StaffService.getAllPT(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all pt is success",
    pts,
    totalPage: Math.ceil(pts.count / 10),
  });
};
const handleGetAllPTOfCenter = async (req, res) => {
  // console.log(req.query.page, req.params.CenterId);
  let ptOfCenter = await StaffService.getAllPTOfCenter(
    req.query.page,
    req.params.CenterId
  );
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all pt of center is success",
    ptOfCenter,
    totalPage: Math.ceil(ptOfCenter.count / 10),
  });
};
const handleGetStaffByName = async (req, res) => {
  let staffName = req.query.staffName;
  if (staffName) {
    let staff = await StaffService.getStaffByName(staffName);
    return res.status(200).json({
      staff,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising name",
    });
  }
};
module.exports = {
  handleGetAllStaff,
  handleGetPTDetail,
  handleGetAllStaffOfCenter,
  handleGetAllPT,
  handleGetStaffByName,
  handleGetAllPTOfCenter,
};
