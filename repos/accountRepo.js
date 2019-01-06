var kn = require('../fn/db');
var moment = require('moment');

exports.list = uid => kn('users_account').select('*').where('uid', uid);

exports.single = id => kn('users_account')
  .select('*')
  .where('id', id)
  .first();

exports.getAccountInfo = account_number => kn('users_account')
  .join('users', 'users_account.uid', '=', 'users.uid')
  .select('users.username', 'users.first_name', 'users.last_name', 'users.email', )
  .where('account_number', account_number)
  .first();

exports.singleByAccNumber = account_number => kn('users_account')
  .select('*')
  .where('account_number', account_number)
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
  .update(input, ['id']);

exports.maxAccNumber = () => kn('users_account')
  .max('account_number as account_number')
  .first();

exports.updateBalance = (id, balance) => {
  return kn('users_account')
    .where('id', id)
    .update({
      'balance': balance
    }, ['id'])
};
