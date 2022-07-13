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
let handleCreateNewBlog = async (req, res) => {
  // console.log("check body: ", req.body);
  let message = await BlogService.createNewBlog(req.body);
  // let messageCreateAccount = await UserService.createNewUser(req.body);
  return res.status(200).json({
    message,
    // messageCreateAccount,
  });
};
let handleDeleteBlog = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  let message = await BlogService.deleteBlog(req.body.id);
  // let messageDeleteAccount = await UserService.deleteAccount(req.body.id);
  return res.status(200).json({ message });
};
const handleUpdateBlog = async (req, res) => {
  let data = req.body;
  let message = await BlogService.updateBlog(data);
  // let messageUpdateAccount = await UserService.updateAccount(data);
  return res.status(200).json(message);
};
module.exports = {
  handleGetAllBlog,
  handleCreateNewBlog,
  handleDeleteBlog,
  handleUpdateBlog,
};
