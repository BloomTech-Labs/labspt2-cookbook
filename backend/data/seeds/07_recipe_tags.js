
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipe_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_tags').insert([
        {/*id: 1,*/ recipe_id: 1, tag_id: 1},
        {/*id: 2,*/ recipe_id: 1, tag_id: 2},
        {/*id: 3,*/ recipe_id: 2, tag_id: 3},
        {/*id: 4,*/ recipe_id: 2, tag_id: 6},
        {/*id: 5,*/ recipe_id: 2, tag_id: 7},
        {/*id: 6,*/ recipe_id: 3, tag_id: 4},
        {/*id: 7,*/ recipe_id: 3, tag_id: 5}
      ]);
    });
};
