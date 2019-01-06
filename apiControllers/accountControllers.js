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

router.get('/user/', (req, res) => {
  uid = req.token_payload.user.uid;
  account_number = parseInt(req.query.account_number);
  accountRepo.getAccountInfo(account_number).then((rows) => {
    res.json({
      account_number: account_number,
      userInfo: rows
    })
  }).catch((err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error log on console');
  })
});

router.get('/:id', (req, res) => {
  var id = +req.params.id;

  if (id) {
    accountRepo.single(id).then((account) => {
      if (req.token_payload.user.uid === account.uid) {
        res.json(account)
      } else {
        res.json({
          msg: 'NOT ALLOWED'
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

router.delete('/:id', (req, res) => {
  var id = +req.params.id;

  if (id) {
    accountRepo.single(id).then((account) => {
      if (account) {
        if (req.token_payload.user.uid === account.uid) {
          if (account.balance !== 0) {
            res.json({
              msg: 'Cannot delete an account! Balance must be equal to zero!'
            })
          } else {
            accountRepo.delete(id).then(row => {
              res.json({
                msg: 'Deleted account!'
              })
            });
          }
        } else {
          res.json({
            msg: 'NOT ALLOWED'
          })
        }
      } else {
        res.statusCode = 404;
        res.end('Not Found');
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
      if (account) {
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
      } else {
        res.statusCode = 404;
        res.end('Account Not Found');
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
