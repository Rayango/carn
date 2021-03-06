require('newrelic');
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
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

consumers.createConsumers();

router
  .get('/', (ctx, next) => {
    try { 
      ctx.status = 200;
      ctx.body = {
        data: 'Hello Koa!'
      }; 
    }
    catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
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
      ctx.status = 202;
      ctx.body = {message: 'message received'};
    }
    catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }  
  })
  .get('/dataForFares', async (ctx, next) => {
    try {
      var t0 = new Date();
      let historicalFareData = await Promise.all(zipCodes.map((zipCode) => db.getZipCodeData(zipCode)));
      console.log(new Date() - t0 + 'ms');
      ctx.status = 200;
      ctx.body = {
        data: historicalFareData
      };
    }
    catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
  });

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening in on port ${port}`);
  })
}

module.exports = app;