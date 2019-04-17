// Base recipe table
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('recipe_id');
    table.string('name').notNullable();
    table.string('image');
    table.string('link').notNullable();
    table.float('prep_time');
    table.float('cook_time');
    table.integer('servings').defaultTo(4);

    // Make 'link' a unique index so that we dont have multiple copies of the same recipe.
    table.unique('link');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
