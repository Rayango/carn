const cassandra = require('cassandra-driver');
const moment = require('moment');
const zipCodes = Object.keys(require('../fakeData/sfZipCodes.js'));
const uuid = require('uuid/v1');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });
console.log('connecting database....');

module.exports = {
  addRequest: (request) => {
    // let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (timeBucket, id, rate, zipOrigin, zipDestination, time_stamp, price) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let params = [request.timeBucket, request.id, request.rate, request.zipOrigin, request.zipDestination, request.timestamp, request.price];
    return client.execute(query, params, {prepare: true})
  },
  lookupRequest: (data, table, callback) => {
    let query = `SELECT * FROM ${table} WHERE timeBucket = ? AND time_stamp = ? AND zipOrigin = ? AND rate = ? AND id = ?`;
    let params = [data.timeBucket, data.timestamp, data.zipOrigin, data.rate, data.id];
    client.execute(query, params, {prepare: true})
      .then(result => {
        callback(null, result.rows);
      })
      .catch(error => callback(error, null));
  },
  getZipCodeData: () => {
    console.log('getting zip code data....');
    let data = {};
    // let endTime = moment().format();
    // let startTime = moment(endTime).subtract(1, 'minutes').format();
    // let timeBucket = moment(startTime).format('MMMM Do YYYY h a');
    let startTime = '2018-02-02T15:25:31-0800,94133';
    let endTime = '2018-02-02T15:26:31-0800,94133';
    let timeBucket = 'February 2nd 2018 3 pm';
    let params = [timeBucket, startTime, endTime];
    let ridesQuery = `SELECT * from rides WHERE timeBucket = ? AND time_stamp > ? AND time_stamp < ?`;
    let viewsQuery = `SELECT count(*) from views WHERE timeBucket = ? AND time_stamp > ? AND time_stamp < ?`;
    return client.execute(ridesQuery, params, {prepare: true})
      .then(ridesResult => {
        return client.execute(viewsQuery, params, {prepare: true})
          .then(viewsResult => {
            return {
              rides: ridesResult.rows,
              views: viewsResult.rows
            };
          })
      })
      .catch(error => console.log('error in selecting count from rides...', error))
  }
};
