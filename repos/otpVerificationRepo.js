var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || 'QWERTYUIOP';
const AC_LIFETIME = parseInt(process.env.ACCESS_TOKEN_LIFETIME) || 1200; // seconds

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
    expiresIn: AC_LIFETIME
  });
};

exports.verifyTransactionToken = (req, res, next) => {
  var transaction_token = req.body.transaction_token;

  if (transaction_token) {
    jwt.verify(transaction_token, SECRET, (err, payload) => {
      if (err) {
        res.statusCode = 401;
        res.json({
          msg: 'INVALID TRANSACTION TOKEN',
          error: err
        })
      } else {
        req.token_payload = payload;
        next();
      }
    });
  } else {
    res.statusCode = 403;
    res.json({
      msg: 'NOT FOUND TRANSACTION TOKEN'
    })
  }
};

