var express = require('express');

var userRepo = require('../repos/userRepo');
var authRepo = require('../repos/authRepo');

var router = express.Router();

router.get('/access', (req, res) => {
  var refresh_token = req.headers['x-refresh-token'];

  if (refresh_token) {
    authRepo.checkRefreshToken(refresh_token).then(row => {
      if (row) {
        userRepo.single(row.uid).then(user_info => {
          res.json({
            auth: true,
            access_token: authRepo.generateAccessToken(user_info)
          })
        });
      } else {
        res.json({
          msg: 'INVALID REFRESH TOKEN',
        })
      }
    });
  } else {
    res.json({
      msg: 'INVALID REFRESH TOKEN',
    })
  }
});

module.exports = router;
