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
    // let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (id, rate, zipOrigin, zipDestination, time_stamp, price) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [request.id, request.rate, request.zipOrigin, request.zipDestination, request.timestamp, request.price];
    client.execute(query, params, {prepare: true})
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  },
  lookupRequest: (zipOrigin, uuid, table, callback) => {
    let query = `SELECT * FROM ${table} WHERE zipOrigin = ${zipOrigin} AND id = ${uuid}`;
    client.execute(query, {prepare: true})
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  }
};
