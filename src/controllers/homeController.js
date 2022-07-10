const path = require("path");

let getHome = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/QRCodePayment.html`));
};

module.exports = {
  getHome: getHome,
};
