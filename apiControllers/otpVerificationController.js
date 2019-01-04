var express = require('express');
var authenticator = require('otplib').authenticator;
var transporter = require('../repos/otpVerificationRepo').transporter;

var router = express.Router();


authenticator.options = {step: parseInt(process.env.OTP_LIFE_TIME) || 600,};

router.get('/', (req, res) => {
  email = req.token_payload.user.email;
  user_display_name = req.token_payload.user.first_name + req.token_payload.user.last_name;

  access_token = req.headers['x-access-token'];

  if (!access_token) {
    console.log(error);

    res.statusCode = 404;
    res.end('Access Token not found');
  }

  const opt = authenticator.generate(access_token);

  var mailOptions = {
    from: process.env.BANK_EMAIL,
    to: email,
    subject: 'Internet Banking Verification Email',
    html: `<p>Dear ${user_display_name},</p>
    <h2>${opt}</h2>
    <p>This code will expire 10 minutes after this email was sent</p>
    <strong>Why you received this email</strong>
    <p>Internet Banking service require you confirm your transaction.</p>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

      res.statusCode = 404;
      res.end('Not Found');
    } else {
      console.log('Email sent: ' + info.response);

      res.json({
        msg: 'Sent verification email!'
      })
    }
  });
});

router.post('/', (req, res) => {
  access_token = req.headers['x-access-token'];

  const isValid = authenticator.check(parseInt(req.body.opt), access_token);

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