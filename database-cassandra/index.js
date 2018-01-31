const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });
console.log('connecting database....');

module.exports = {
  getAllViews: (callback) => {
    client.execute(`SELECT * FROM views`)
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  },
  addRequest: (request, callback) => {
    console.log('request...', request);
    var query = 'INSERT INTO views (id, rate, zip, time, price) VALUES (?, ?, ?, ?, ?)';
    var params = [request.id, request.rate, request.zip, request.time, request.price];
    client.execute(query, params, {prepare: true})
      .then(result => callback(null, result))
      .catch(error => console.log(error, null));
  }
};
