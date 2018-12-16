var kn = require('../fn/db');
var moment = require('moment');

exports.list = uid => kn('users_account').select('uid', 'account_number', 'balance').where('uid', uid);

exports.single = id => kn('users_account')
  .select('uid', 'account_number', 'balance')
  .where('id', id)
  .first();

exports.add = input => {
  input.create_at = moment().format(process.env.DATETIME_FORMAT);
  return kn('users_account')
    .insert(input)
    .returning('uid');
};

exports.delete = id => kn('users_account')
  .where('id', id)
  .del();

exports.update = (id, input) => kn('users_account')
  .where('id', id)
  .update(input);

exports.maxAccNumber = () => kn('users_account')
  .max('account_number as account_number')
  .first();

exports.recharge = (id, balance) => {
  return kn('users_account')
    .where('id', id)
    .update('balance', balance)
};
