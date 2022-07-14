import Customer from "../models/Customer";
import db from "../models/index";
import BookingService from "../Services/BookingService";
import ReviewService from "../Services/ReviewService";

const handleGetReviewOfCenter = async (req, res) => {
  const reviewOfCenter = await ReviewService.getAllReviewOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all review of center is success",
    reviewOfCenter,
    totalPage: Math.ceil(reviewOfCenter.count / 10),
  });
};

const handleGet5ReviewNewest = async (req, res) => {
  const fiveReviewOfCenter = await ReviewService.get5ReviewOfCenter(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all review of center is success",
    fiveReviewOfCenter,
    // totalPage: Math.ceil(reviewOfCenter.count / 10),
  });
};
let handleCreateNewReview = async (req, res) => {
  // console.log("check body: ", req.body);
  let message = await ReviewService.createNewReview(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
const handleUpdateReview = async (req, res) => {
  let data = req.body;
  let message = await ReviewService.updateReview(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
const handleHideReview = async (req, res) => {
  let data = req.body;
  let message = await ReviewService.hideShowReview(data);
  return res.status(200).json(message);
};
let handleDeleteReview = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await ReviewService.deleteReview(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};
module.exports = {
  handleGetReviewOfCenter,
  handleCreateNewReview,
  handleUpdateReview,
  handleDeleteReview,
  handleHideReview,
  handleGet5ReviewNewest,
};
