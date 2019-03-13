// Update with your config settings.

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
    client: 'postgresql',
    connection: {
      database: 'd8r5v5pr7mrdj3',
      user:     'rgqwmytwnobshm',
      host: 'ec2-23-23-241-119.compute-1.amazonaws.com',
      port: '5432',
      password: '94791855fa17a87b0a6d504ee40575eae36ec30a9f62b288e345b2c4c746cefd'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
