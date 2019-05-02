const path = require('path');
const fs = require('fs');

if ( process.env.NODE_ENV != "production") {
  //import .env variables
  if (fs.existsSync(path.join(__dirname, '../../.env'))) {
   require('dotenv-safe').load({
     path: path.join(__dirname, '../../.env'),
     sample: path.join(__dirname, '../../.env.example'),
   });
  }
}



var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || undefined,
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || process.env.MONGO_URI,
    mongoURLLabel = "";
console.log("port : " + port);
console.log("ip : " + ip);
console.log("mongoURL : "+ mongoURL);


if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'] || '27017',
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];


  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}

module.exports = {
  pathToServe: __dirname+'/../../dist',
  env: process.env.NODE_ENV,
  port: port,
  ip: ip,
  mongo: {
    uri: process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : mongoURL,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};
