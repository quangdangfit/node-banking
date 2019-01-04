var nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BANK_EMAIL,
    pass: process.env.BANK_EMAIL_PWD,
  }
});