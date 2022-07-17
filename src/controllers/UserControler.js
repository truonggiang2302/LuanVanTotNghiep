import Account from "../models/Account";
import db from "../models/index";
import UserService from "../Services/UserService";

const handleLoginCustomer = async (req, res) => {
  // console.log("check data from: ", req.body);

  let email = req.body.email;
  let password = req.body.password;

  if (!email) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  // console.log("check data from: ", req.body);
  let userData = await UserService.handleUserLoginForCustomer(email, password);

  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.errMessage,
    data: userData.user ? userData.user : {},
  });
};
const handleAuthEmailExist = async (req, res) => {
  let email = req.body.email;
  if (!email) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await UserService.handleAuthEmailExist(email);

  return res.status(200).json({
    errorCode: userData.errCode,
    message: userData.errMessage,
    // data: userData.user ? userData.user : {},
  });
};
const handleLogin = async (req, res) => {
  console.log("check data from: ", req.body);

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  console.log("check data from: ", req.body);
  let userData = await UserService.handleUserLogin(email, password);

  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.errMessage,
    data: userData.user ? userData.user : {},
  });
};
const handleLoginForStaff = async (req, res) => {
  // console.log("check data from: ", req.body);

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  console.log("check data from: ", req.body);
  let userData = await UserService.handleUserLoginForStaff(email, password);

  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.errMessage,
    data: userData.user ? userData.user : {},
  });
};
const handleGetAllAccountForAdmin = async (req, res) => {
  let accounts = await UserService.getAllAccount(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all accounts is success",
    accounts,
    totalPage: Math.ceil(accounts.count / 10),
  });
};
const handleUpdateAccount = async (req, res) => {
  let data = req.body;
  let message = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
let handleDeleteAccount = async (req, res) => {
  console.log("check data delete", req.body);
  if (!req.body.ExternalId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await UserService.deleteAccount(req.body);
  return res.status(200).json(message);
};
const handleChangePasswordWhenAuth = async (req, res) => {
  if (!req.body) {
    return res.send(404).json("Missing input paramater");
  }
  let data = req.body;
  let message = await UserService.changePasswordWhenAuth(data);
  return res.send(200).json(message);
};
const handleChangePassword = async (req, res) => {
  if (!req.body) {
    return res.send(404).json("Missing input paramater");
  }
  let data = req.body;
  let message = await UserService.changePassword(data);
  return res.send(200).json(message);
};
let handleLoginSocial = async (req, res) => {
  let email = req.body.email;
  let id = req.body.userID;
  let name = req.body.name;
  let avatar = req.body.avatar;

  if (!email || !id || !name) {
    return res.status(500).json({
      errorCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let message = await UserService.handleUserLoginSocial(
    email,
    id,
    name,
    avatar
  );

  return res.status(200).json({
    errCode: message.errCode,
    errMessage: message.errMessage,
  });
};
const handleGetAccountByName = async (req, res) => {
  let email = req.query.email;
  if (email) {
    let account = await UserService.getAccountByName(email);
    return res.status(200).json({
      account,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising name",
    });
  }
};
let getAllRoles = async (req, res) => {
  try {
    let data = await UserService.getAllRoles();
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all roles error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  console.log("check body: ", req.body);
  let message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleSignUpNewUser = async (req, res) => {
  let message = await UserService.signUpNewUser(req.body);
  return res.status(200).json(message);
};

let handleGetAllUser = async (req, res) => {
  let user = await UserService.getAllUser();
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    user,
  });
};

let getEditUser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let user = await UserService.getEditUser(id);
    return res.status(200).json({
      errCode: 0,
      errMessage: "OK",
      user,
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising id",
    });
  }
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await UserService.updateUser(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await UserService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetAllAccountForAdmin,
  handleLoginCustomer,
  handleCreateNewUser,
  handleLoginForStaff,
  handleUpdateAccount,
  handleGetAccountByName,
  handleDeleteAccount,
  handleChangePassword,
  //   getAllRoles,

  //   handleGetAllUser,
  //   getEditUser,
  //   handleEditUser,
  //   handleDeleteUser,
  //   handleSignUpNewUser,
  //   handleLoginSocial,
  handleAuthEmailExist,
  handleChangePasswordWhenAuth,
};
