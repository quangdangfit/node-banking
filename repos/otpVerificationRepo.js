var authenticator = require('otplib').authenticator;
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || 'QWERTYUIOP';
const OTP_LIFE_TIME = parseInt(process.env.OTP_LIFE_TIME) || 600; // seconds

authenticator.options = {
  step: OTP_LIFE_TIME,
  window: 1
};

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BANK_EMAIL,
    pass: process.env.BANK_EMAIL_PWD,
  }
});

exports.generateTransactionToken = input => {
  var payload = {
    transaction: input,
    info: 'This token will be used to verify transaction!'
  };
  return jwt.sign(payload, SECRET, {
    expiresIn: OTP_LIFE_TIME
  });
};

exports.verifyTransactionToken = (req, res, next) => {
  var transaction_token = req.body.transaction_token;
  const isValid = authenticator.check(parseInt(req.body.otp), transaction_token);

  if (!isValid) {
    console.log(``);

    res.statusCode = 404;
    res.end('INVALID OTP');
  } else {
    console.log('Verify OTP successfully!');

    if (transaction_token) {
      jwt.verify(transaction_token, SECRET, (err, payload) => {
        if (err) {
          res.statusCode = 401;
          res.json({
            msg: 'INVALID TRANSACTION TOKEN',
            error: err
          })
        } else {
          req.transaction_payload = payload.transaction;
          next();
        }
      });
    } else {
      res.statusCode = 403;
      res.json({
        msg: 'NOT FOUND TRANSACTION TOKEN'
      })
    }
  }
};

exports.authenticator = authenticator;
