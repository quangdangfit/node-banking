var express = require('express');
var recipientRepo = require('../repos/recipientRepo');

var router = express.Router();

router.get('/', (req, res) => {
  uid = req.token_payload.user.uid;
  recipientRepo.list(uid).then((rows) => {
    res.json({
      uid: uid,
      recipients: rows
    })
  }).catch((err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('View error log on console');
  })
});

router.post('/', (req, res) => {
  var input = req.body;
  input.uid = req.token_payload.user.uid;
  recipientRepo.add(input)
    .then(row => {
      res.json({
        msg: 'Recipient added into list!'
      })
    })
    .catch(err => {
      console.log(err);
      res.statusCode = 500;
      res.end('View error log on console');
    });
});

router.put('/:id', (req, res) => {
  var id = +req.params.id;

  if (id) {
    recipientRepo.update(id)
      .then(row => {
        res.json({
          msg: 'Updated recipient!'
        })
      })
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

router.delete('/:id', (req, res) => {
  var id = +req.params.id;

  if (id) {
    recipientRepo.delete(id)
      .then(row => {
        res.json({
          msg: 'Deleted recipient!'
        })
      })
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

module.exports = router;
