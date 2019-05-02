
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {/*ing_id: 1, */ name: 'milk'},
        {/*ing_id: 2, */ name: 'white vinegar'},
        {/*ing_id: 3, */ name: 'all-purpose flour'},
        {/*ing_id: 4, */ name: 'white sugar'},
        {/*ing_id: 5, */ name: 'baking powder'},
        {/*ing_id: 6, */ name: 'baking soda'},
        {/*ing_id: 7, */ name: 'salt'},
        {/*ing_id: 8, */ name: 'egg'},
        {/*ing_id: 9, */ name: 'butter, melted'},
        {/*ing_id: 10,*/  name: 'cooking spray'},
        {/*ing_id: 11,*/  name: 'tuna, drained and flaked'},
        {/*ing_id: 12,*/  name: 'mayonnaise'},
        {/*ing_id: 13,*/  name: 'celery, chopped'},
        {/*ing_id: 14,*/  name: 'sweet pickle relish'},
        {/*ing_id: 15,*/  name: 'ground black pepper'},
        {/*ing_id: 16,*/  name: 'dry spaghetti'},
        {/*ing_id: 17,*/  name: 'extra-virgin olive oil'},
        {/*ing_id: 18,*/  name: 'pancetta or slab bacon, cubed or sliced into small strips'},
        {/*ing_id: 19,*/  name: 'garlic cloves, finely chopped'},
        {/*ing_id: 20,*/  name: 'large eggs'},
        {/*ing_id: 21,*/  name: 'freshly ground Parmigiano-Reggiano, plus more for serving'},
        {/*ing_id: 22,*/  name: 'fresh flat-leaf parsley, chopped'},
      ]);
    });
};
