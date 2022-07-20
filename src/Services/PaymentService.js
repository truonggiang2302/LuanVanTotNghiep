import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
require("dotenv").config();
var salt = bcrypt.genSaltSync(10);
var cloudinary = require("cloudinary").v2;

const crypto = require("crypto");
const https = require("https");
const area = require("./areaJson");
// const Sequelize = require("sequelize");

//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
var notifyUrl = "https://8272-115-73-215-16.ap.ngrok.io/api/handle-order";
var partnerCode = "MOMO";
var accessKey = "F8BBA842ECF85";
var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var orderInfo = "pay with MoMo";
var redirectUrl = "https://localhost:3000/";
var requestType = "captureWallet";

const getMomoPaymentLink = async (req) => {
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    req.body.amount +
    "&extraData=" +
    req.body.orderId +
    "&ipnUrl=" +
    notifyUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  //console.log("--------------------RAW SIGNATURE----------------");
  console.log("rawSignature: ", rawSignature);
  //signature
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  //console.log("--------------------SIGNATURE----------------");
  console.log("signature: ", signature);
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: req.body.amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: notifyUrl,
    extraData: req.body.orderId,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });

  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);
      res.setEncoding("utf8");
      res.on("data", (body) => {
        console.log("Body: ");
        console.log(body);
        console.log("payUrl: ");
        console.log(JSON.parse(body).payUrl);
        resolve(JSON.parse(body));
      });
      res.on("end", () => {
        console.log("No more data in response.");
        // var post_req = https.request(options2, function (res) {
        //   res.setEncoding('utf8');
        //   res.on('data', function (chunk) {
        //     console.log('Response: ' + chunk);
        //   });
        // });
        // // post the data
        // post_req.write(requestBody);
        // post_req.end();
      });
    });

    req.on("error", (e) => {
      // console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....");

    req.write(requestBody);
    req.end();
  });
};

module.exports = {
  getMomoPaymentLink,
};
