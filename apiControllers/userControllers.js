var express = require('express');

var userRepo = require('../repos/userRepo');
var authRepo = require('../repos/authRepo');

var router = express.Router();

router.get('/', (req, res) => {
  userRepo.list().then((rows) => {
    res.json({
      users: rows
    })
  }).catch((err) => {
    throw err
  })
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  userRepo.single(id).then((row) => {
    res.json(row)
  }).catch((err) => {
    throw err
  })
});

router.post('/', (req, res) => {
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

module.exports = router;
