require('newrelic');
const AWS = require('aws-sdk');

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const bodyParser = require('koa-body');
const generateFakeData = require('../testData/fakeDataGenerator.js');
const db = require('../database-cassandra/index.js');
const zipCodes = Object.keys(require('../testData/sfZipCodes.js'));

const app = new Koa();
const router = new Router();

var port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port === "number") ? port : 3000;

app
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })
  .use(router.routes())
  .use(router.allowedMethods());


AWS.config.loadFromPath('./config-sample.json');
AWS.config.update({region: 'us-west-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const Consumer = require('sqs-consumer');

var params = {
  QueueName: 'events',
  Attributes: {
    'DelaySeconds': '60',
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

const inbox = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
  handleMessage: (message, done) => {
    db.addRequest(JSON.parse(message.Body));
    done();
  }
});

inbox.on('error', (err) => {
  console.log(err.message);
});

inbox.start();

router
  .get('/', (ctx, next) => {
    ctx.body = {
      data: 'Hello Koa!'
    }; 
  })
  .post('/requests', bodyParser(), async (ctx, next) => {
    console.log('request at endpoint /requests....', ctx.request.body);
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

    // var params = {
    //   QueueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
    //   VisibilityTimeout: 0
    // };

    // sqs.receiveMessage(params, function(err, messageData) {
    //   if (err) {
    //     console.log('error in receiving message', err);
    //   } else {
    //     console.log('received message....', JSON.parse(messageData.Messages[0]['Body']))
    //     db.addRequest(JSON.parse(messageData.Messages[0]['Body']));

    //     var deleteParams = {
    //       QueueUrl: 'https://sqs.us-west-1.amazonaws.com/135132304111/events',
    //       ReceiptHandle: messageData.Messages[0].ReceiptHandle
    //     };
    //     sqs.deleteMessage(deleteParams, function(err, data) {
    //       if (err) {
    //         console.log("Delete Error", err);
    //       } else {
    //         console.log("Message Deleted", data);
    //       }
    //     });
    //   }
    // });

    // let dbResponse = await db.addRequest(ctx.request.body);
    // ctx.body = {
    //   data: 'request has been added to DB!'
    // };
  })
  .get('/dataForFares', async (ctx, next) => {
    let historicalFareData = await db.getZipCodeData();
    let dataForFares = {};
    for (let zipCode of zipCodes) {
      dataForFares[zipCode] = {
        views: 0,
        rides: 0
      };
    }
    for (let ride of historicalFareData.rides) {
      if (dataForFares[ride.ziporigin]) {
        dataForFares[ride.ziporigin].rides++;
      }
    }
    for (let view of historicalFareData.views) {
      if (dataForFares[view.ziporigin]) {
        dataForFares[view.ziporigin].views++;
      }
    }
    ctx.body = {
      data: dataForFares
    };
  });

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  })
}

module.exports = app;