const db = require('../dbConfig.js');

module.exports = {
  // get - with and without id
  get: function(id) {
    return id ? db('users').where('user_id', id).first() : db('users');
  },


  // post - new user data

  // put - update user

  // delete - remove user
};