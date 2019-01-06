var kn = require('../fn/db');

exports.list = uid => kn('recipient_list').select('*').where('uid', uid);

exports.single = id => kn('recipient_list')
  .select('*')
  .where('id', id)
  .first();

exports.add = input => {
  return kn('recipient_list')
    .insert(input)
    .returning('id');
};

exports.delete = id => kn('recipient_list')
  .where('id', id)
  .del();

exports.update = (id, input) => kn('recipient_list')
  .where('id', id)
  .update(input, ['id']);
