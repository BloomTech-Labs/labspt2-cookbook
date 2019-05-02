const es = require('elasticsearch');

const esClient = new es.Client({
  host: 'https://eo67k345yh:4hzg20su5m@spruce-49926084.us-east-1.bonsaisearch.net',
  log: 'trace'
});

module.exports = esClient;