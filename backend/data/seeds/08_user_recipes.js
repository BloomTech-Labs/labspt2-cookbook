
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_recipes').insert([
        {/*id: 1,*/ user_id: 1, recipe_id: 1},
        {/*id: 2,*/ user_id: 1, recipe_id: 2},
        {/*id: 3,*/ user_id: 1, recipe_id: 3}
      ]);
    });
};
