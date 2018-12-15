var jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET_KEY || 'QWERTYUIOP';

exports.verifyStaff = (req, res, next) => {
  var access_token = req.headers['x-access-token'];
  if (access_token) {
    jwt.verify(access_token, SECRET, (err, payload) => {
      if (err) {
        res.statusCode = 401;
        res.json({
          msg: 'INVALID ACCESS TOKEN',
          error: err
        })
      } else {
        req.token_payload = payload;
        if (req.token_payload.user.role in [1, 2]) {
          next();
        } else {
          res.json({
            msg: 'USER IS NOT ALLOWED'
          })
        }
      }
    });
  } else {
    res.statusCode = 403;
    res.json({
      msg: 'NOT FOUND ACCESS TOKEN'
    })
  }
};
