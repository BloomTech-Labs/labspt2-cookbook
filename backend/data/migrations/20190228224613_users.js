
// User table - holds login info, email, etc.
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('user_id');  // Used as foreign key in other tables
    table.string('auth_id').notNullable().unique();  // Connects with Auth0 or other
    table.string('stripe_id'); // Users account id with Stripe
    table.string('subscription_id'); // Users subscription id with Stripe
    table.string('email').notNullable();
    table.enu('type', [0,1,2]).notNullable().defaultTo(0); // 0 = free, 1 = paid, 2 = admin
    table.datetime('billing_date');  // when to switch from paid->free
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
