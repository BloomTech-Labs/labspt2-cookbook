// Join table to link users to their recipes
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_recipes', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.integer('recipe_id').unsigned().notNullable();

    // table.foreign('user_id').references('user_id').inTable('users');
    // table.foreign('recipe_id').references('recipe_id').inTable('recipes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_recipes');
};
