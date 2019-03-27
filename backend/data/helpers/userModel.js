const db = require('../dbConfig.js');

module.exports = {
  // get - with and without id
  get: function (id) {
    return id ? db('users').where('user_id', id).first() : db('users');
  },

  //get - with auth_id

  getByAuth: function (authId) {
    return db('users').where('auth_id', authId).first().pluck('user_id');
  },


  // post - new user data
  insert: function (user) {
    return db('users').insert(user).then(([id]) => this.get(id));
  },

  // put - update user
  update: function (id, changes) {
    return db('users').where('user_id', id).update(changes).then(count => (count > 0 ? this.get(id) : null));
  },


  // delete - remove user
  remove: function (id) {
    return db('users').where('user_id', id).del();
  },

};



