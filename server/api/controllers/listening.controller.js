const httpStatus = require('http-status');
const { omit } = require('lodash');
const Listening = require('../models/listening.model');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const mongoose = require('mongoose');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load listening and append to req.
 * @public
 */
exports.load = async ((req, res, next, id) => {
  try {
    const listening = await (Listening.get(id));
    req.locals = { listening };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

/**
 * Get listening
 * @public
 */
exports.get = (req, res) => res.json(req.locals.listening.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res, nexy) => {


  res.json(req.user.transform())


};

/**
 * Create new listening
 * @public
 */
exports.create =  (req, res, next) => {
  console.log('create a listening : '+JSON.stringify(req.body));
  //const user = new User(req.body);
  console.log('listening is about to be saved')
  req.body.userIdObj = new mongoose.Types.ObjectId(req.body.userId)
  Listening.create(req.body, function (err, createdListening) {
    if (err) { console.error('error : '+JSON.stringify(err));
      return next(err); }
    console.log("created !");
    return res.status(201).json( createdListening);
  });
};


/**
 * Create new listening
 * @public
 */
// exports.updateUserIdObj=  async (req, res, next) => {
//   console.log('patching listening ');
//   const listenings = await (Listening.list({"perPage" : 500}));
//   for (var i = 0; i < listenings.length; i++) {
//     var obj = new mongoose.Types.ObjectId(listenings[i].userId)
//     await listenings[i].updateOne({"$set" : { "userIdObj" : obj }});
//   }
//
//   return res.status(200).json( {"ok" : "ok"});
// };


/**
 * Get listening list
 * @public
 */
exports.list = async ((req, res, next) => {
  try {
    const listenings = await (Listening.list(req.query));
    const transformedListenings = listenings.map(listening => listening.transform());
    res.json(transformedListenings);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { listening } = req.locals;

  listening.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
