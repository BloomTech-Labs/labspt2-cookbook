
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe_ingredients', function(table) {
    table.increments('id');
    table.integer('recipe_id').unsigned().notNullable();
    table.float('amount');
    table.string('measurement');
    table.integer('ing_id').unsigned().notNullable();

    // table.foreign('recipe_id').references('recipe_id').inTable('recipes');
    // table.foreign('ing_id').references('ing_id').inTable('ingredients');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipe_ingredients');
};
