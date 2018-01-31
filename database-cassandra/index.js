const cassandra = require('cassandra-driver');
const uuid = require('uuid/v1');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });
console.log('connecting database....');

module.exports = {
  getAllViews: (callback) => {
    client.execute(`SELECT * FROM views`)
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  },
  addRequest: (request, callback) => {
    let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (id, rate, zipOrigin, zipDestination, time, price) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [id, request.rate, request.zipOrigin, request.zipDestination, request.time, request.price];
    client.execute(query, params, {prepare: true})
      .then(result => callback(null, result))
      .catch(error => console.log(error, null));
  }
};
