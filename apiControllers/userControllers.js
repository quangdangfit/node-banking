var express = require('express');

var userRepo = require('../repos/userRepo');
var authRepo = require('../repos/authRepo');
var verifyStaff = require('../repos/staffRepo').verifyStaff;

var router = express.Router();

router.get('/', verifyStaff, (req, res) => {
  userRepo.list().then((rows) => {
    res.json({
      users: rows
    })
  }).catch((err) => {
    throw err
  })
});

router.post('/', verifyStaff, (req, res) => {
  userRepo.add(req.body).then((uid) => {
    if (uid) {
      res.json({
        msg: `Added user!`
      })
    }
  });
});

router.post('/login', (req, res) => {
  userRepo.login(req.body).then((row) => {
    if (row) {
      var user_info = row;
      var access_token = authRepo.generateAccessToken(user_info);
      var refresh_token = authRepo.generateRefreshToken();
      authRepo.getRefreshToken(user_info.uid)
        .then(uid => {
          if (uid) {
            authRepo.updateRefreshToken(user_info.uid, refresh_token)
              .then(uid => {
                res.json({
                  auth: true,
                  user: user_info,
                  access_token: access_token,
                  refresh_token: refresh_token
                })
              })
          } else {
            authRepo.insertRefreshToken(user_info.uid, refresh_token)
              .then(uid => {
                res.json({
                  auth: true,
                  user: user_info,
                  access_token: access_token,
                  refresh_token: refresh_token
                })
              })
          }
        })
        .catch(err => {
          console.log(err);
          res.statusCode = 500;
          res.end('View error log on console');
        });
    }
  });
});

router.get('/:id', verifyStaff, (req, res) => {
  var id = +req.params.id;
  if (id) {
    userRepo.single(id).then((row) => {
      res.json(row)
    }).catch((err) => {
      throw err
    })
  } else{
    res.statusCode = 404;
    res.end('Not Found');
  }
});

module.exports = router;
