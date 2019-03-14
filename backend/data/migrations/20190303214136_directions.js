
exports.up = function(knex, Promise) {
  return knex.schema.createTable('directions', function(table) {
    table.increments('dir_id');
    table.integer('recipe_id').unsigned().notNullable();
    table.integer('order').notNullable().defaultTo(0);
    table.text('directions').notNullable();

    // table.foreign('recipe_id').references('recipe_id').inTable('recipes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('directions');
};
