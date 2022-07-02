import Customer from "../models/Customer";
import db from "../models/index";
import PaymentService from "../Services/PaymentService";

const getMomoPaymentLink = async (req, res) => {
  try {
    const result = await PaymentService.getMomoPaymentLink(req);
    return res
      .status(200)
      .json(jsonFormat.dataSuccess("Get Link successfully", result));
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
};
