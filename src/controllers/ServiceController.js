import Customer from "../models/Customer";
import db from "../models/index";
import ServiceOfCenterService from "../Services/ServiceOfCenterService";

const handleGetAllService = async (req, res) => {
  let services = await ServiceOfCenterService.getAllService(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all service is success",
    services,
    totalPage: Math.ceil(services.count / 10),
  });
};
const handleGetServiceByStaff = async (req, res) => {
  let services = await ServiceOfCenterService.getServiceByStaff(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all service is success",
    services,
    totalPage: Math.ceil(services.count / 10),
  });
};
const handleGetServiceDetail = async (req, res) => {
  // console.log("check id: ", req.query);
  const serviceDetail = await ServiceOfCenterService.getDetailService(
    req.query.id
  );

  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail service is success",
    serviceDetail,
  });
};
const handleGetServiceByName = async (req, res) => {
  let serviceName = req.query.serviceName;
  if (serviceName) {
    let service = await ServiceOfCenterService.getServiceByName(serviceName);
    return res.status(200).json({
      service,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising name",
    });
  }
};
let handleCreateNewService = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await ServiceOfCenterService.createNewService(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
const handleUpdateService = async (req, res) => {
  let data = req.body;
  let message = await ServiceOfCenterService.updateService(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
let handleDeleteService = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await ServiceOfCenterService.deleteService(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};
module.exports = {
  handleGetAllService,
  handleGetServiceDetail,
  handleGetServiceByName,
  handleCreateNewService,
  handleUpdateService,
  handleDeleteService,
  handleGetServiceByStaff,
};
