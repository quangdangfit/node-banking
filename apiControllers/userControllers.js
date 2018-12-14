var express = require('express');

var userRepo = require('../repos/userRepo');

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
  userRepo.login(req.body).then((uid) => {
    if (uid) {
      res.json({
        msg: `Logged in!`
      })
    }
  });
});

module.exports = router;
