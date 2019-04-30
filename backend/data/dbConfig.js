const knex = require('knex');
require('dotenv').config('../.env');

const env = process.env.MODE || 'development';
const knexConfig = require('../knexfile');

// module.exports = knex(knexConfig);
module.exports = knex(knexConfig[env]);