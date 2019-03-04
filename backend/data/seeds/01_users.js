
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, auth_id: 'abcd123', email: 'user1@none.com', type: 0, billing_date:null},
        {user_id: 2, auth_id: 'bcde234', email: 'user2@none.com', type: 0, billing_date:null},
        {user_id: 3, auth_id: 'cdef345', email: 'user3@none.com', type: 0, billing_date:null}
      ]);
    });
};
