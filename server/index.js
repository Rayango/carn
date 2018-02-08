require('newrelic');
// require('dotenv').config()
const AWS = require('aws-sdk');
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const bodyParser = require('koa-body');
const generateFakeData = require('../testData/fakeDataGenerator.js');
const db = require('../database-cassandra/index.js');
const consumers = require('./sqsConsumers.js')
const zipCodes = Object.keys(require('../testData/sfZipCodes.js'));

const app = new Koa();
const router = new Router();

var port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port === "number") ? port : 3000;

app
  .use(router.routes())
  .use(router.allowedMethods());


AWS.config.loadFromPath('./config-sample.json');
// AWS.config.update({region: 'us-west-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// const Consumer = require('sqs-consumer');
// const SqsQueueParallel = require('sqs-queue-parallel');

var params = {
  QueueName: 'events',
  Attributes: {
    'DelaySeconds': '0',
    'MessageRetentionPeriod': '86400'
  }
};

sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});

consumers.createConsumers();

// const inbox = Consumer.create({
//   queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
//   batchSize: 10,
//   handleMessage: (message, done) => {
//     db.addRequest(JSON.parse(message.Body));
//     done();
//   }
// });

// inbox.on('error', (err) => {
//   console.log(err.message);
// });

// inbox.start();

// const inboxTwo = Consumer.create({
//   queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
//   batchSize: 10,
//   handleMessage: (message, done) => {
//     db.addRequest(JSON.parse(message.Body));
//     done();
//   }
// });

// inboxTwo.on('error', (err) => {
//   console.log(err.message);
// });

// inboxTwo.start();

// const inboxThree = Consumer.create({
//   queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
//   batchSize: 10,
//   handleMessage: (message, done) => {
//     db.addRequest(JSON.parse(message.Body));
//     done();
//   }
// });

// inboxThree.on('error', (err) => {
//   console.log(err.message);
// });

// inboxThree.start();

// const inboxFour = Consumer.create({
//   queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
//   batchSize: 10,
//   handleMessage: (message, done) => {
//     db.addRequest(JSON.parse(message.Body));
//     done();
//   }
// });

// inboxFour.on('error', (err) => {
//   console.log(err.message);
// });

// inboxFour.start();

router
  .get('/', (ctx, next) => {
    try { 
      // ctx.status = 200;
      ctx.body = {
        data: 'Hello Koa!'
      }; 
    }
    catch (err) {
      ctx.status = 404;
      ctx.body = err;
    }  
  })
  .post('/requests', bodyParser(), async (ctx, next) => {
    try {  
      var params = {
        MessageBody: JSON.stringify(ctx.request.body),
        QueueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
        DelaySeconds: 0
      };

      sqs.sendMessage(params, function(err, messageData) {
        if (err) {
          console.log('error in sending message', err);
        } else {
          console.log('message sent!', messageData);
        }
      });
    }
    catch (err) {
      ctx.status = 404;
      ctx.body = err;
    }  
  })
  .get('/dataForFares', async (ctx, next) => {
    try {
      let historicalFareData = await db.getZipCodeData();
      let dataForFares = {};
      for (let zipCode of zipCodes) {
        dataForFares[zipCode] = {
          views: 0,
          rides: 0
        };
      }
      for (let ride of historicalFareData.rides) {
        // if (dataForFares[ride.ziporigin]) {
          dataForFares[ride.ziporigin].rides++;
        // }
      }
      for (let view of historicalFareData.views) {
        // if (dataForFares[view.ziporigin]) {
          dataForFares[view.ziporigin].views++;
        // }
      }
      ctx.status = 200;
      ctx.body = {
        data: dataForFares
      };
    }
    catch (err) {
      ctx.status = 404;
      ctx.body = err;
    }
  });

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  })
}

module.exports = app;