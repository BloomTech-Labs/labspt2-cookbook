
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shopping_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('shopping_list').insert([
        {/*id: 1,*/ user_id: 1, amount: 1, measurement: 'cup', ing_id: 1, start: '2019-04-01', end: '2019-04-07'},
        {/*id: 2,*/ user_id: 1, amount: 1, measurement: 'cup', ing_id: 1, start: '2019-04-01', end: '2019-04-07'},
        {/*id: 3,*/ user_id: 1, amount: 1, measurement: 'cup', ing_id: 1, start: '2019-04-01', end: '2019-04-07'}
      ]);
    });
};
