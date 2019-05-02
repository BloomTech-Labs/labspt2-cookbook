
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {/*tag_id: 1,*/ tag: 'breakfast'},
        {/*tag_id: 2,*/ tag: 'lunch'},
        {/*tag_id: 3,*/ tag: 'dinner'},
        {/*tag_id: 4,*/ tag: 'brunch'},
        {/*tag_id: 5,*/ tag: 'pasta'},
        {/*tag_id: 6,*/ tag: 'salad'},
        {/*tag_id: 7,*/ tag: 'tuna'}
      ]);
    });
};
