require('newrelic');
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const bodyParser = require('koa-body');
const generateFakeData = require('../fakeData/fakeDataGenerator.js');
const db = require('../database-cassandra/index.js');
const zipCodes = Object.keys(require('../fakeData/sfZipCodes.js'));

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
    let dbResponse = await db.addRequest(ctx.request.body);
    ctx.body = {
      data: 'request has been added to DB!'
    };
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