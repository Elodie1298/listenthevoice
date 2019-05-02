const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const { handler: errorHandler } = require('../middlewares/error');

const fs = require('fs');
const {pathToServe}  = require('../../config/vars');
const audioFolder = pathToServe + '/static/audio/ensemble ';

/**
 * Load user and append to req.
 * @public
 */
exports.load = async ((req, res, next, id) => {
  try {
//    console.log("id user is : " + id);
    const user = await (User.findById(id));
    req.locals = { user };
//    console.log("user is found : "+ JSON.stringify(user));
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
});

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create =  (req, res, next) => {
  console.log('create a user : '+JSON.stringify(req.body));
  //const user = new User(req.body);
  createSoundList(req.body.soundSet,
    function(soundList) {
      req.body.soundList = soundList;
      console.log('user is about to be saved :'+req.body)
      if (isNaN(req.body.age) ){
        return res.status(400).json( {"error" : "missing age"});
      }
      User.create(req.body, function (err, createdUser) {
        if (err) { console.error('error : '+JSON.stringify(err));
          return next(err); }
        console.log("created ! = " + createdUser);
        return res.status(201).json( createdUser);
      });
    });

};

function createSoundList(soundSet,cb) {

  var fileList = []
  fs.readdir(audioFolder + soundSet, (err, files) => {
    if (err) {
      console.error("error listing files : "+ err);
      return cb([]);
    }
    var positifs = [];
    var negatifs = [];
    for(var i=0;i < files.length;i++) {
      console.log(files[i]);
      if(files[i].indexOf('N') >= 0 || files[i].indexOf('J') >= 0 || files[i].indexOf('S') >= 0 ) {
        positifs.push(files[i]);
      } else {
        negatifs.push(files[i]);
      }
    };
    var posIndex = 0;
    var negIndex = 0;
    console.log("neg size : "+negatifs.length  + "  / pos size : "+positifs.length);
    for(var i=0;i < files.length;i++) {
      if (i % 2) {
        fileList.push(negatifs[negIndex]);
        negIndex++;
      }
      else {
        if ( posIndex >= positifs.length) {
          fileList.push(negatifs[posIndex]);
          negIndex++;
        } else {
          fileList.push(positifs[posIndex]);
          posIndex++;
        }
      }
    }

    console.log(fileList);
    return cb(fileList);
  })

}

/**fileOrder :   negatif : C D P T
              positif : N J S

              deux bloc de 7 en commençant par un negatif
*/
/**
 * Replace existing user
 * @public
 */
exports.replace = async ((req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const newUserObject = omit(newUser.toObject(), '_id');

    await (user.update(newUserObject, { override: true, upsert: true }));
    const savedUser = await (User.findById(user._id));

    res.json(savedUser.transform());
  } catch (error) {
    next(error);
  }
});

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
 console.log("modification du user : " + JSON.stringify(req.body));
  const updatedUser = req.body;
//  console.log("user : " + JSON.stringify(req.locals.user));
  const user = Object.assign(req.locals.user, updatedUser);
  console.log('user to save : '+ JSON.stringify(user));
  user.save()
    .then(savedUser => {
      console.log('saved user ok : ' + savedUser);
      res.json(savedUser.transform())
    })
    .catch(e => {
      console.error('oups une erreur : ' + e);
      next(e)});
};

/**
 * Get user list
 * @public
 */
exports.list = async ((req, res, next) => {
  try {
    const users = await (User.list(req.query));
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

exports.getStats= (req, res, next) => {
  User.aggregate([
      {"$match" : { "cancel" : "false"}},
      {"$lookup":
           {
             "from": "listenings",
             "localField": "_id",
             "foreignField": "userIdObj",
             "as": "listenings"
           }}
      ])
      .then((result) => res.status(httpStatus.OK).json(result))
      .catch(e => next(e));
};
