const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'events' });
console.log('connecting client....', client);
const query = `CREATE TABLE views (
  rate float,
  price float,
  zip text,
  time text,
  PRIMARY KEY (rate, zip, time)
)`;

client.execute(query)
  .then(result => console.log('result...', result));