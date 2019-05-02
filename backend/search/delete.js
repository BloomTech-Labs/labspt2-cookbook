const esClient = require('./connection.js');

esClient.indices.delete({index: 'recipes'}, function(err, resp, status) {
  console.log("ES Delete:", resp);
});