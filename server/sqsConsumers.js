const Consumer = require('sqs-consumer');
const db = require('../database-cassandra/index.js');

module.exports = {
  createConsumers: () => {
    const consumerOne = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerOne.on('error', (err) => {
      console.log(err.message);
    });

    consumerOne.start();

    const consumerTwo = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerTwo.on('error', (err) => {
      console.log(err.message);
    });

    consumerTwo.start();

    const consumerThree = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerThree.on('error', (err) => {
      console.log(err.message);
    });

    consumerThree.start();

    const consumerFour = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerFour.on('error', (err) => {
      console.log(err.message);
    });

    consumerFour.start();

    const consumerFive = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerFive.on('error', (err) => {
      console.log(err.message);
    });

    consumerFive.start();
  }  
};  