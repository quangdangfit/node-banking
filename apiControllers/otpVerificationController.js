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
          html: `<div style="font-size: 18px">
          <p>Dear ${user_display_name},</p>
          <p>This is OTP Number from Internet Banking to verify your transaction.</p>
          <h2>${otp}</h2>
          <p>This OTP number will expire 
           <strong>${parseInt(process.env.OTP_LIFE_TIME) / 60}</strong>
           minutes after this email was sent.</p>
          <p>Internet Banking service require you confirm your transaction. If you are having nay issues with your
          account, please do not hesitate to contact us by replying this email.</p>
          <br><p>Thanks,</p><p>Quang Dang</p>
          </div>`
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