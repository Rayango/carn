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
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

consumers.createConsumers();

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
      let historicalFareData = await Promise.all(zipCodes.map((zipCode) => db.getZipCodeData(zipCode)));
      ctx.status = 200;
      console.log(ctx.body);
      ctx.body = {
        data: historicalFareData
      };
    }
    catch (err) {
      console.log(err);
      ctx.status = 404;
      ctx.body = err;
    }
  });

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening in on port ${port}`);
  })
}

module.exports = app;