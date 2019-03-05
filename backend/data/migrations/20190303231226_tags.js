
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments('tag_id');
    table.string('tag', 25).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
