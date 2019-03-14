
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe_tags', function(table) {
    table.increments('id');
    table.integer('recipe_id').unsigned().notNullable();
    table.integer('tag_id').unsigned().notNullable();

    // table.foreign('recipe_id').references('recipe_id').inTable('recipes');
    // table.foreign('tag_id').references('tag_id').inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('recipe_tags');
};
