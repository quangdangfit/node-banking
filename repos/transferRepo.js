var kn = require('../fn/db');
var moment = require('moment');

exports.list = src_account => kn('transfers').select('*').where('src_account', src_account);

exports.single = id => kn('transfers')
  .select('*')
  .where('id', id)
  .first();

exports.add = input => {
  input.date = moment().format(process.env.DATETIME_FORMAT);
  return kn('transfers')
    .insert(input)
    .returning('id');
};
