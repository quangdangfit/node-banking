var express = require('express');
var authenticator = require('otplib').authenticator;
var otpRepo = require('../repos/otpVerificationRepo');

var router = express.Router();

authenticator.options = {step: parseInt(process.env.OTP_LIFE_TIME) || 600,};


router.get('/', (req, res) => {
  var email = req.token_payload.user.email;
  var user_display_name = req.token_payload.user.first_name + req.token_payload.user.last_name;

  var transaction_token = otpRepo.generateTransactionToken(req.body);

  if (!transaction_token) {
    console.log(error);

    res.statusCode = 404;
    res.end('Access Token not found');
  }

  const otp = authenticator.generate(transaction_token);

  var mailOptions = {
    from: process.env.BANK_EMAIL,
    to: email,
    subject: 'Internet Banking Verification Email',
    html: `<p>Dear ${user_display_name},</p>
    <h2>${otp}</h2>
    <p>This code will expire 10 minutes after this email was sent</p>
    <strong>Why you received this email</strong>
    <p>Internet Banking service require you confirm your transaction.</p>
    `
  };

  otpRepo.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

      res.statusCode = 404;
      res.end('Not Found');
    } else {
      console.log('Email sent: ' + info.response);

      res.json({
        msg: 'Sent verification email!',
        transaction_token: transaction_token
      })
    }
  });
});

router.post('/', otpRepo.verifyTransactionToken, (req, res) => {
  var transaction_token = req.body.transaction_token;
  const isValid = authenticator.check(parseInt(req.body.otp), transaction_token);

  if (!isValid) {
    console.log(``);

    res.statusCode = 404;
    res.end('OTP is invalid');
  } else {
    console.log('Verify OTP successfully!');

    res.statusCode = 200;
    res.json({
      msg: 'Verify OTP successfully!'
    })
  }
});

module.exports = router;