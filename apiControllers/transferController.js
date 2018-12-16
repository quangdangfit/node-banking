var express = require('express');

var accountRepo = require('../repos/accountRepo');
var transferRepo = require('../repos/transferRepo');

var router = express.Router();

router.get('/', (req, res) => {
  account_number = req.query.account;
  uid = req.token_payload.user.uid;

  accountRepo.singleByAccNumber(account_number)
    .then(account => {
      if (account.uid === uid) {
        transferRepo.list(account_number).then((rows) => {
          res.json({
            account_number: account_number,
            transfers_log: rows
          })
        }).catch((err) => {
          throw err
        })
      } else {
        res.json({
          msg: 'Not allowed!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error log on console');
    });
});

router.post('/', (req, res) => {
  if (!(req.body.src_account && req.body.dest_account && req.body.amount > 0 && req.body.free_type)) {
    res.json({
      msg: 'Input is invalid!'
    })
  } else {
    accountRepo.singleByAccNumber(req.body.src_account)
      .then((src_account) => {
          if (src_account.uid !== req.token_payload.user.uid) {
            res.json({
              msg: 'Not allowed!'
            })
          } else {
            var src_balance = parseInt(src_account.balance) - parseInt(req.body.amount);
            if (src_balance > 0) {
              accountRepo.updateBalance(src_account.id, src_balance).then((row) => {
                accountRepo.singleByAccNumber(req.body.dest_account).then(dest_account => {
                  var dest_balance = parseInt(dest_account.balance) + parseInt(req.body.amount);
                  accountRepo.updateBalance(dest_account.id, dest_balance).then((row) => {
                    transferRepo.add(req.body)
                      .then(row => {
                        res.json({
                          msg: 'Transfer is done!'
                        })
                      })
                      .catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('View error log on console');
                      });
                  });
                });
              })
            } else {
              res.json({
                msg: 'Balance is not enough!'
              })
            }
          }
        }
      )
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
      });
  }
})
;

module.exports = router;
