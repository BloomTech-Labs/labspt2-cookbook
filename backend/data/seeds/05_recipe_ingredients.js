
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('recipe_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_ingredients').insert([
        {/*id: 1, */ recipe_id: 1, amount: .75, measurement: 'cup', ing_id: 1},
        {/*id: 2, */ recipe_id: 1, amount: 2, measurement: 'tablespoons', ing_id: 2},
        {/*id: 3, */ recipe_id: 1, amount: 1, measurement: 'cup', ing_id: 3},
        {/*id: 4, */ recipe_id: 1, amount: 2, measurement: 'tablespoons', ing_id: 4},
        {/*id: 5, */ recipe_id: 1, amount: 1, measurement: 'teaspoon', ing_id: 5},
        {/*id: 6, */ recipe_id: 1, amount: .5, measurement: 'teaspoon', ing_id: 6},
        {/*id: 7, */ recipe_id: 1, amount: .5, measurement: 'teaspoon', ing_id: 7},
        {/*id: 8, */ recipe_id: 1, amount: 1, measurement: null, ing_id: 8},
        {/*id: 9, */ recipe_id: 1, amount: 2, measurement: 'tablespoons', ing_id: 9},
        {/*id: 10,*/  recipe_id: 1, amount: null, measurement: null, ing_id: 10},
        {/*id: 11,*/  recipe_id: 2, amount: 1, measurement: null, ing_id: 8},
        {/*id: 12,*/  recipe_id: 2, amount: 1, measurement: '(5 oz) can', ing_id: 11},
        {/*id: 13,*/  recipe_id: 2, amount: 3, measurement: 'tablespoons', ing_id: 12},
        {/*id: 14,*/  recipe_id: 2, amount: 2, measurement: 'stalks', ing_id: 13},
        {/*id: 15,*/  recipe_id: 2, amount: 2, measurement: 'tablespoons', ing_id: 14},
        {/*id: 16,*/  recipe_id: 2, amount: 1, measurement: 'pinch', ing_id: 15},
        {/*id: 17,*/  recipe_id: 3, amount: 1, measurement: 'pound', ing_id: 16},
        {/*id: 18,*/  recipe_id: 3, amount: 2, measurement: 'tablespoons', ing_id: 17},
        {/*id: 19,*/  recipe_id: 3, amount: 4, measurement: 'ounces', ing_id: 18},
        {/*id: 20,*/  recipe_id: 3, amount: 4, measurement: null, ing_id: 19},
        {/*id: 21,*/  recipe_id: 3, amount: 2, measurement: null, ing_id: 20},
        {/*id: 22,*/  recipe_id: 3, amount: 1, measurement: 'cup', ing_id: 21},
        {/*id: 23,*/  recipe_id: 3, amount: null, measurement: null, ing_id: 15},
        {/*id: 24,*/  recipe_id: 3, amount: 1, measurement: 'handful', ing_id: 22}
      ]);
    });
};
