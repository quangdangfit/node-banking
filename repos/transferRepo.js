var kn = require('../fn/db');
var moment = require('moment');

exports.list = src_account => kn('transfers').select('*').where({'src_account': src_account, 'state': 'done'});

exports.single = id => kn('transfers')
  .select('*')
  .where({'id': id, 'state': 'to confirm'})
  .first();

exports.add = input => {
  input.create_at = moment().format(process.env.DATETIME_FORMAT);
  return kn('transfers')
    .insert(input)
    .returning(['id']);
};

exports.update = (id, input) => kn('transfers')
  .where('id', id)
  .update(input, ['id']);
