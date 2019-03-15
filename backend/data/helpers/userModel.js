const db = require('../dbConfig.js');

module.exports = {
  // get - with and without id
  get: function (id) {
    return id ? db('users').where('user_id', id).first() : db('users');
  },

  //get - with auth_id

  getByAuth: function (authId) {
    return db('users').where('auth_id', authId)
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


///email and userid

///if user doesnt exist add in type as 0, billing date null
//if they do exist then post the auth id and email with new accoutn type of 0
