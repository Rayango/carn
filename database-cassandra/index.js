const cassandra = require('cassandra-driver');
const moment = require('moment');
const zipCodes = Object.keys(require('../testData/sfZipCodes.js'));
const uuid = require('uuid/v1');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });

module.exports = {
  addRequest: (request) => {
    // let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (hourBucket, minuteBucket, id, rate, zipOrigin, zipDestination, time_stamp, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let params = [request.hourBucket, request.minuteBucket, request.id, request.rate, request.zipOrigin, request.zipDestination, request.timestamp, request.price];
    return client.execute(query, params, {prepare: true});
  },
  lookupRequest: (data, table, callback) => {
    let query = `SELECT * FROM ${table} WHERE hourBucket = ? AND minuteBucket = ?`;
    let params = [data.hourBucket, data.minuteBucket];
    console.log('params in lookupRequest....', params);
    client.execute(query, params, {prepare: true})
      .then(result => {
        console.log('result...', result);
        callback(null, result.rows);
      })
      .catch(error => callback(error, null));
  },
  getZipCodeData: () => {
    let data = {};
    // let endTime = moment().format();
    // let startTime = moment(endTime).subtract(1, 'minutes').format();
    // let timeBucket = moment(startTime).format('MMMM Do YYYY h a');
    let hourBucket = 'February 5th 2018 11 pm';
    let minuteBucket = 'February 5th 2018 11:09 pm';
    let params = [hourBucket, minuteBucket];
    let ridesQuery = `SELECT * from rides WHERE hourBucket = ? AND minuteBucket = ?`;
    let viewsQuery = `SELECT * from views WHERE hourBucket = ? AND minuteBucket = ?`;
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
