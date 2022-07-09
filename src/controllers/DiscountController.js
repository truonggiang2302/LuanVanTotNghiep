import Customer from "../models/Customer";
import db from "../models/index";
import DiscountService from "../Services/DiscountService";

const handleGetDetailDiscount = async (req, res) => {
  let discount = await DiscountService.getDetailDiscount(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get detail discount is success",
    discount,
    // totalPage: Math.ceil(schedule.count / 10),
  });
};

module.exports = {
  handleGetDetailDiscount,
};
