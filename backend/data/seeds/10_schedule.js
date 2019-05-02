
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schedule').del()
    .then(function () {
      // Inserts seed entries
      return knex('schedule').insert([
        {/*id: 1,*/ user_id: 1, date: "2019-04-06", recipe_id: 1, tag_id: 1},
        {/*id: 2,*/ user_id: 1, date: "2019-04-06", recipe_id: 2, tag_id: 2},
        {/*id: 3,*/ user_id: 1, date: "2019-04-06", recipe_id: 3, tag_id: 3}
      ]);
    });
};
