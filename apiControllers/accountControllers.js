var express = require('express');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.get('/', (req, res) => {
  uid = req.token_payload.user.uid;
  accountRepo.list(uid).then((rows) => {
    res.json({
      uid: uid,
      accounts: rows
    })
  }).catch((err) => {
    throw err
  })
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  accountRepo.single(id).then((row) => {
    res.json(row)
  }).catch((err) => {
    throw err
  })
});

router.post('/', (req, res) => {
  req.body.uid = req.token_payload.user.uid;
  accountRepo.maxAccNumber().then(row => {
    if (row.account_number) {
      req.body.account_number = row.account_number + 1
    } else {
      req.body.account_number = parseInt(process.env.ACOUNT_NUMBER_CODE);
    }
    accountRepo.add(req.body).then((uid) => {
      if (uid) {
        res.json({
          msg: `Added Account!`
        })
      }
    });
  });
});

module.exports = router;
