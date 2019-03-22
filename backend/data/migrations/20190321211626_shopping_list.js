
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_list', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.float('amount');
    table.string('measurement');
    table.integer('ing_id').unsigned().notNullable();
    table.date('start');
    table.date('end');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('shopping_list');
};
