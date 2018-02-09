const CronJob = require('cron').CronJob;

var new CronJob('* 0-59 * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');