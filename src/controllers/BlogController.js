import Customer from "../models/Customer";
import db from "../models/index";
import BookingService from "../Services/BookingService";
import ReviewService from "../Services/ReviewService";
import BlogService from "../Services/BlogService";

const handleGetAllBlog = async (req, res) => {
  const blog = await BlogService.getAllBlog(req);
  return res.status(200).json({
    errCode: 0,
    errMessage: "get all blog of system is success",
    blog,
    totalPage: Math.ceil(blog.count / 10),
  });
};

module.exports = {
  handleGetAllBlog,
};
