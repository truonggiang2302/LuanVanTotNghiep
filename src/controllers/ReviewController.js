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

module.exports = {
  handleGetReviewOfCenter,
};
