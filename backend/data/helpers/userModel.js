const db = require('../dbConfig.js');

module.exports = {
  // get - with and without id
  get: function(id) {
    let query = db('users');

    if(id) {
      query = query
        .where('user_id', id)
        .first();
    }

    return query;
  },


  // post - new user data

  // put - update user

  // delete - remove user
};