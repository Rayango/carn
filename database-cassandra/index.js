const cassandra = require('cassandra-driver');
const moment = require('moment');
const zipCodes = Object.keys(require('../fakeData/sfZipCodes.js'));
const uuid = require('uuid/v1');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });
console.log('connecting database....');

module.exports = {
  // getAllViews: (callback) => {
  //   client.execute(`SELECT * FROM views`)
  //     .then(result => callback(null, result))
  //     .catch(error => callback(error, null));
  // },
  addRequest: (request, callback) => {
    // let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (id, rate, zipOrigin, zipDestination, time_stamp, price) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [request.id, request.rate, request.zipOrigin, request.zipDestination, request.timestamp, request.price];
    // client.execute(query, params, {prepare: true})
    //   .then(result => callback(null, result))
    //   .catch(error => callback(error, null));
    return client.execute(query, params, {prepare: true});
  },
  lookupRequest: (data, table, callback) => {
    let query = `SELECT * FROM ${table} WHERE zipOrigin = ${data.zipOrigin} AND timestamp = ${data.timestamp} AND id = ${data.id}`;
    return client.execute(query, {prepare: true})
      .then(result => {
        return result.rows;
      })
      .catch(error => console.log('error....', error));
  },
  getZipCodeData: () => {
    console.log('getting zip code data....');
    let data = {};
    let endTime = moment().format();
    let startTime = moment(endTime).subtract(1, 'minutes').format();
    return moment(endTime).format('MMMM Do YYYY, h')
    let queries = [];
    let queryTemplate = `SELECT * from rides WHERE zipOrigin = ? AND time_stamp > ? AND time_stamp < ?`;
    for (let zipCode of zipCodes) {
      queries.push( {query: queryTemplate, params: [zipCode, startTime, endTime]} );
    }
    console.log('queries.....', queries);
    return client.batch(queries, {prepare: true})
      .then(result => {
        console.log('result........', result)
        return result.rows;
      })
      .catch(error => console.log('error....', error))
  }
};
