import Customer from "../models/Customer";
import db from "../models/index";
const jsonFormat = require("../jsonHelper/jsonFormat");

import PaymentService from "../Services/PaymentService";
import mailer from "../utils/mailer";

const handleOrderPayment = async (req, res) => {
  try {
    const result = await PaymentService.handleOrderPaymentService(req);
    return res
      .status(200)
      .json(jsonFormat.dataSuccess("Handle payment successfully", result));
  } catch (e) {
    return res
      .status(400)
      .json(
        jsonFormat.dataError(
          e.message
            ? e.message
            : "Somethings gone wrong, please try again or contact Admin if the issue persists."
        )
      );
  }
};
const getMomoPaymentLink = async (req, res) => {
  try {
    const result = await PaymentService.getMomoPaymentLink(req);
    console.log("check result req: ", result);
    // mailer.sendMail(
    //   req.body.to,
    //   req.body.subject,
    //   req.body.htmlContent,
    //   req.body.orderId
    // );
    return res.status(200).json({
      result,
    });
    // return res
    //   .status(200)
    //   .json(jsonFormat.dataSuccess("Get Link successfully", result));
  } catch (e) {
    return res
      .status(400)
      .json(
        jsonFormat.dataError(
          e.message
            ? e.message
            : "Somethings gone wrong, please try again or contact Admin if the issue persists."
        )
      );
  }
};

module.exports = {
  getMomoPaymentLink,
  handleOrderPayment,
};
