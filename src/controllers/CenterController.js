import Customer from "../models/Customer";
import db from "../models/index";
import CenterService from "../Services/CenterService";

const handleGetAllCenter = async (req, res) => {
  let centers = await CenterService.getAllCenter(req.query);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all centers is success",
    centers,
    totalPage: Math.ceil(centers.count / 10),
  });
};
const handleGetDetailCenter = async (req, res) => {
  // console.log("check id: ", req.query);
  const centerDetail = await CenterService.getDetailCenter(req.query.id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail center is success",
    centerDetail,
  });
};
const handleGetCenterByName = async (req, res) => {
  let centerName = req.query.centerName;
  if (centerName) {
    let center = await CenterService.getCenterByName(centerName);
    return res.status(200).json({
      center,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising name",
    });
  }
};
module.exports = {
  handleGetAllCenter,
  handleGetDetailCenter,
  handleGetCenterByName,
};
