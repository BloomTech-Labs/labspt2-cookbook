const knex = require('knex');
require('dotenv').config('../.env');

const env = process.env.MODE || 'development';
const knexConfig = require('../knexfile')[env];

module.exports = knex(knexConfig);