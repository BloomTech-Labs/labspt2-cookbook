// Update with your config settings.

// Must require the dotEnv file to connect with pg:
require('dotenv').config('/.env');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/kookr.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/data/migrations'
    },
    seeds: {
      directory: __dirname + '/data/seeds'
    },
    useNullAsDefault: true
  }

};
