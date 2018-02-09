const cassandra = require('cassandra-driver');
const moment = require('moment');
const zipCodes = Object.keys(require('../testData/sfZipCodes.js'));
const uuid = require('uuid/v1');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });

module.exports = {
  addRequest: (request) => {
    // let id = uuid();
    let table = request.ride ? 'rides' : 'views';
    let query = `INSERT INTO ${table} (id, rate, zipOrigin, zipDestination, time_stamp, price) VALUES (?, ?, ?, ?, ?, ?)`;
    let params = [request.id, request.rate, request.zipOrigin, request.zipDestination, request.timestamp, request.price];
    return client.execute(query, params, {prepare: true})
      .then(result => {
        // console.log('request added');
        return 'request added';
      })
      .catch(error => console.log(error));
  },
  getZipCodeData: (zipCode) => {
    // let endTime = moment().format();
    // let startTime = moment(endTime).subtract(1, 'minutes').format();
    let endTime = '2018-02-08T22:28:34-0800';
    let startTime = moment(endTime).subtract(1, 'minutes').format();
    // let timeBucket = moment(startTime).format('MMMM Do YYYY h a');
    // let hourBucket = 'February 5th 2018 11 pm';
    // let minuteBucket = 'February 5th 2018 11:09 pm';
    let params = [startTime, endTime];
    let ridesQuery = `SELECT count(*) from rides WHERE zipOrigin = ${zipCode} AND time_stamp >= ? AND time_stamp < ?`;
    let viewsQuery = `SELECT count(*) from views WHERE zipOrigin = ${zipCode} AND time_stamp >= ? AND time_stamp < ?`;
    // let ridesQuery = `SELECT count(*) from rides WHERE hourBucket = ? AND minuteBucket = ? AND zipOrigin = ${zipCode}`;
    // let viewsQuery = `SELECT count(*) from views WHERE hourBucket = ? AND minuteBucket = ? AND zipOrigin = ${zipCode}`;

    return client.execute(ridesQuery, params, {prepare: true})
      .then(ridesResult => {
        return client.execute(viewsQuery, params, {prepare: true})
          .then(viewsResult => {
            return {
              zipOrigin: zipCode,
              rides: ridesResult.rows[0]['count'],
              views: viewsResult.rows[0]['count']
            };
          })
      })
      .catch(error => console.log('error in selecting count from rides...', error))
  }
};
