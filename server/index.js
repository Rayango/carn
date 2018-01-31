const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const generateFakeData = require('../fakeData/fakeDataGenerator.js');

const app = new Koa();
const router = new Router();

var port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port === "number") ? port : 3000;

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello Koa!';
  })
  .post('/requests', (ctx, next) => {
    console.log('request...', ctx);
    ctx.body = 'hey';
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

// var server = app.listen(port);

if (!module.parent) { 
  app.listen(port, function() {
    console.log(`listening on port ${port}`);
  })
}

module.exports = app;