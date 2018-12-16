var express = require('express');
var accountRepo = require('../repos/accountRepo');
var verifyStaff = require('../repos/staffRepo').verifyStaff;

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

router.get('/:id', (req, res) => {
  var id = +req.params.id;

  if (id) {
    accountRepo.single(id).then((row) => {
      if (req.token_payload.user.uid === row.uid) {
        res.json(row)
      } else {
        res.json({
          msg: 'USER IS NOT ALLOWED'
        })
      }
    }).catch((err) => {
      throw err
    })
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

router.put('/:id/balance/', verifyStaff, (req, res) => {
  var id = +req.params.id;

  if (id) {
    accountRepo.single(id).then((account) => {
      if (parseInt(req.body.amount) > 0) {
        req.body.balance = parseInt(account.balance) + parseInt(req.body.amount);
        accountRepo.updateBalance(id, req.body.balance).then((row) => {
          res.json({
            msg: `Balance ${row.id} is updated!`
          })
        })
      } else {
        res.json({
          msg: 'Amount must be greater than zero!'
        })
      }
    }).catch((err) => {
      throw err
    })
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

module.exports = router;
