
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', function(table) {
    table.increments('ing_id');
    table.string('name').unique().notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ingredients');
};
