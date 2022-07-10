const nodeMailer = require("nodemailer");
const path = require("path");
const { QRtemplate } = require("../views/QRCodePayment");
const QRCode = require("qrcode");
const db = require("../models");

// const template = require("../views/QRCodePayment.html");
// const templateTest = require("../views/test.html");
// Những thông tin dưới đây các bạn có thể ném nó vào biến môi trường env nhé.
// Vì để demo nên mình để các biến const ở đây.
const adminEmail = "duongtruonggiang1215@gmail.com";
const adminPassword = "qskgnjxczabpctje";
// Mình sử dụng host của google - gmail
const mailHost = "smtp.gmail.com";
// 587 là một cổng tiêu chuẩn và phổ biến trong giao thức SMTP
const mailPort = 587;
const getQR = async (req, res) => {
  let img = "";
  let data = req;
  console.log("check data: ", data);
  let order = await db.Order.findOne({
    where: { id: data.id },
    raw: false,
    nest: true,
  });
  console.log("check order: ", order);
  if (order) {
    let qr = await QRCode.toDataURL("I am Duong Truong Giang!");
    // console.log(qr);
    img = `<image src= " ` + qr + `" />`;
    return qr;
  }
  let qr = await QRCode.toDataURL(
    "Hello I am Duong Truong Giang, Something wrong here! Please check and try again"
  );
  // console.log(qr);
  img = `<image src= " ` + qr + `" />`;
  return qr;
};
const sendMail = async (to, subject, htmlContent, orderId) => {
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  // const qr = await getQR();
  console.log("check data input ", to, subject, htmlContent, orderId);
  let img = "";
  let qr = "";
  // let data = req;
  // console.log("check data: ", data);
  let order = await db.Order.findOne({
    where: { id: orderId },
    raw: false,
    nest: true,
  });
  console.log("check order: ", order.dataValues);
  if (order) {
    qr = await QRCode.toDataURL([
      order.dataValues.ReservationId.toString(),
      ",",
      order.dataValues.CustomerId.toString(),
      ",",
      order.dataValues.amount.toString(),
      ",",
      order.dataValues.Status === 0 ? "PAID" : "UNPAID",
      ",",
      order.dataValues.createdAt.toString(),
      ".",
    ]);
    // console.log(qr);
    img = `<image src= " ` + qr + `" />`;
  } else {
    qr = "I am Duong Truong Giang! Wrong";
  }
  // console.log("check qr: ", qr);
  const options = {
    from: adminEmail, // địa chỉ admin email bạn dùng để gửi
    to: to, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail
    attachments: [
      {
        // path: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKlSURBVO3BQW7sWAwEwSxC979yjnfD1QMEqfvbBCPiD9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGuXgoCd+k0iXhDpU7kvBNKk8Ua5RijVKsUS5epvKmJNyhcpKETuUOlTcl4U3FGqVYoxRrlIsPS8IdKk8k4USlS0KnckcS7lD5pGKNUqxRijXKxR+ncpKELgmTFWuUYo1SrFEu/rgkrP8Va5RijVKsUS4+TOWTVLokdCqfpPKbFGuUYo1SrFEuXpaEb0pCp9IloVPpktCpnCThNyvWKMUapVijxB8MloROZbJijVKsUYo1ysVDSehUTpLwTSpdEjqVLgmdykkSOpUuCXeoPFGsUYo1SrFGuXhIpUtCp3KHyhNJuCMJnUqXhE6lU7lD5ZOKNUqxRinWKBcPJeEkCU8koVM5UemScEcSnkjCHUnoVJ4o1ijFGqVYo8QfvCgJncpJEk5UuiScqNyRhBOVLgknKl0STlTeVKxRijVKsUa5+LAkdCqdSpeELgmdyh1J+CSVLgmdSpeETyrWKMUapVijxB/8YUk4UTlJQqdyRxI6lS4Jd6g8UaxRijVKsUa5eCgJ36TyRBI6lS4JJyonSThR+aRijVKsUYo1ysXLVN6UhDtUTlSeSEKn0iXhJAmdypuKNUqxRinWKBcfloQ7VJ5IwonKicqbVL6pWKMUa5RijXIxjEqXhC4Jd6icJKFT+ZeKNUqxRinWKBd/nEqXhCdU3pSEO1SeKNYoxRqlWKNcfJjKN6mcJOEkCScqncpvUqxRijVKsUa5eFkSvikJd6h0SbgjCScqnco3FWuUYo1SrFHiD9YYxRqlWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFG+Q85uvvrUJR+gAAAAABJRU5ErkJggg==",
        path: `${qr}`,
        cid: "qr",
      },
    ],
    html: QRtemplate, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  };

  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options);
};

module.exports = {
  sendMail: sendMail,
};
