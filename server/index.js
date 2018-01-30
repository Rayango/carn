const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const generateFakeData = require('../fakeData/fakeDataGenerator.js');

const app = new Koa();
const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello Koa!';
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);