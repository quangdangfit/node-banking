var md5 = require('crypto-js/md5'),
  kn = require('../fn/db');

exports.list = () => kn('users').select('uid', 'username', 'first_name', 'last_name', 'email', 'phone');

exports.single = id => kn('users')
  .select('uid', 'username', 'first_name', 'last_name', 'email', 'phone')
  .where('uid', id)
  .first();

exports.add = input => {
  input.password = md5(input.password).toString();
  return kn('users').insert(input).returning('uid')
};

exports.delete = id => kn('users')
  .where('uid', id)
  .del();

exports.update = (id, input) => kn('users')
  .where('uid', id)
  .update(input);

exports.login = (input) => {
  var md5_pwd = md5(input.password).toString();
  return kn('users').select('uid', 'username', 'first_name', 'last_name', 'email', 'phone').where({
    'username': input.username,
    'password': md5_pwd
  }).first()
};





