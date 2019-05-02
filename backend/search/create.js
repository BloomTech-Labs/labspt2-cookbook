const esClient = require('./connection.js');

esClient.indices.create({
  index: 'recipes'
}, function(err, resp, status) {
  if(err) {
    console.log(`ElasticSearch error: ${err}`);
  } else {
    console.log("ES Create:", resp);
  }
});