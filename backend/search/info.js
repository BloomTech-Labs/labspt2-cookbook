const esClient = require('./connection.js');

// Test the connection:
// Send a HEAD request to "/" and allow
// up to 30 seconds for it to complete.
esClient.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

esClient.cluster.health({}, function(err, resp, status) {
  console.log("-- Client Health --", resp);
});