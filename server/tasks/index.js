'use strict';

var CronJob = require('cron').CronJob;

var sendEmail = require('./send.email');


module.exports = function(app) {

  console.log('skeduling tasks ...');
  new CronJob('0 0 */1 * * *', function() {
    sendEmail();
  });

}
