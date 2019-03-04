// Base recipe table
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('recipe_id');
    table.string('name').notNullable();
    table.string('image');
    table.string('link').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
