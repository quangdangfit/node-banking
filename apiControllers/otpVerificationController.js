var express = require('express');
var otpRepo = require('../repos/otpVerificationRepo');

var router = express.Router();
var authenticator = otpRepo.authenticator;
var transferRepo = require('../repos/transferRepo');

router.post('/', (req, res) => {
  var input = req.body;
  input.state = 'to confirm';

  transferRepo.add(input)
    .then(row => {
      if (row) {
        var email = req.token_payload.user.email;
        var user_display_name = req.token_payload.user.first_name + req.token_payload.user.last_name;

        var transaction_token = otpRepo.generateTransactionToken(row[0]);

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
          <p>Internet Banking service require you confirm your transaction.</p>`
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
      }
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error log on console');
    });
});

module.exports = router;