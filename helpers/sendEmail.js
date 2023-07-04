const nodemailer = require("nodemailer");
require("dotenv").config();

const { HOTMAIL_EMAIL, HOTMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: HOTMAIL_EMAIL,
    pass: HOTMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: HOTMAIL_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
