
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable();
    table.date('date');
    table.integer('recipe_id').unsigned().notNullable();
    table.integer('tag_id').unsigned().notNullable();
    table.integer('servings').defaultTo(4);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('schedule');
};
