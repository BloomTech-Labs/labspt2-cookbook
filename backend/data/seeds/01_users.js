
const faker = require('faker');


const createFakeUser = () => ({
  auth_id: faker.random.alphaNumeric(25),
  email: faker.internet.email(),
  type: 0,
  billing_date: faker.date.future()
});

exports.seed = async function(knex, Promise) {
  await knex('users').del();
  // 600 users
  const fakeUsers = [];
  const desiredFakeUsers = process.env.SEEDS || 3;

  for( let i = 0; i < desiredFakeUsers; i++ ) {
    fakeUsers.push( createFakeUser() );
  }
  await knex('users').insert(fakeUsers);
}