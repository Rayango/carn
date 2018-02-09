/* istanbul ignore file */
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

    const consumerSix = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerSix.on('error', (err) => {
      console.log(err.message);
    });

    consumerSix.start();

    const consumerSeven = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerSeven.on('error', (err) => {
      console.log(err.message);
    });

    consumerSeven.start();

    const consumerEight = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerEight.on('error', (err) => {
      console.log(err.message);
    });

    consumerEight.start();

    const consumerNine = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerNine.on('error', (err) => {
      console.log(err.message);
    });

    consumerNine.start();

    const consumerTen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerTen.on('error', (err) => {
      console.log(err.message);
    });

    consumerTen.start();

    const consumerEleven = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerEleven.on('error', (err) => {
      console.log(err.message);
    });

    consumerEleven.start();

    const consumerTwelve = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerTwelve.on('error', (err) => {
      console.log(err.message);
    });

    consumerTwelve.start();

    const consumerThirteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerThirteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerThirteen.start();

    const consumerFourteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerFourteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerFourteen.start();

    const consumerFifteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerFifteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerFifteen.start();

    const consumerSixteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerSixteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerSixteen.start();

    const consumerSeventeen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerSeventeen.on('error', (err) => {
      console.log(err.message);
    });

    consumerSeventeen.start();

    const consumerEighteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerEighteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerEighteen.start();

    const consumerNineteen = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerNineteen.on('error', (err) => {
      console.log(err.message);
    });

    consumerNineteen.start();

    const consumerTwenty = Consumer.create({
      queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
      batchSize: 10,
      handleMessage: (message, done) => {
        db.addRequest(JSON.parse(message.Body));
        done();
      }
    });

    consumerTwenty.on('error', (err) => {
      console.log(err.message);
    });

    consumerTwenty.start();
  }  
};  