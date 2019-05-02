const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {

  mongoose.connect(mongo.uri, {
    poolSize: 20,
    socketTimeoutMS: 480000,
    keepAlive: 300000,
    reconnectTries: 60,
    reconnectInterval: 2000,
    useNewUrlParser: true
  });
  //console.log('mongoose connection : ' + mongoose.connection);
  return mongoose.connection;
};
