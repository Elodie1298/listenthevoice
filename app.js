var express = require('express');
var path = require('path');
//var serveStatic = require('serve-static');
const { ip, port, env } = require('./server/config/vars');
const app = require('./server/config/express');
const mongoose = require('./server/config/mongoose');



// open mongoose connection
mongoose.connect();
//app = express();
// var pathToServe = __dirname+"/dist";
// console.log("path to serve : " + pathToServe);
// app.use('/',express.static(pathToServe));
//var port = process.env.PORT || 5000;
// listen to requests
//app.listen(port,ip, () => console.info(`server started on ${ip}:${port} (${env})`));

app.listen(port,ip);
console.log('server started on'+ port + ' ...');

// Start scheduled tasks
require('./server/tasks')(app);
require('./server/tasks/send.email')();
