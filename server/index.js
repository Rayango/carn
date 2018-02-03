require('newrelic');
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const bodyParser = require('koa-body');
const generateFakeData = require('../fakeData/fakeDataGenerator.js');
const db = require('../database-cassandra/index.js');


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

router
  .get('/', (ctx, next) => {
    ctx.body = {
      data: 'Hello Koa!'
    }; 
  })
  .post('/requests', bodyParser(), async (ctx, next) => {
    const dbResponse = await db.addRequest(ctx.request.body);
    ctx.body = {
      data: 'request has been added to DB!'
    };
    // db.addRequest(ctx.request.body, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     ctx.body = {
    //       data: 'request has been added to DB!'
    //     };
    //     console.log('request has been added to DB!');
    //   }
    // });
  })
  .get('/dataForFares', async (ctx, next) => {
    const historicalFareData = await db.getZipCodeData();
    console.log('historicalFareData....', historicalFareData);
    ctx.body = {
      data: historicalFareData
    };
  });

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  })
}

module.exports = app;