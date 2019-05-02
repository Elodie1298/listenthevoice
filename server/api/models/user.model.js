const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
const { env } = require('../../config/vars');


/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({

  culture: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  frenchSpeaking: {
    type: Boolean,
    required: true
  },
  soundSet: {
    type: Number,
    required: true
  },
  soundList: [String],
  cancel: {
    type: String,
    default: false
  },
  check: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true,
});



/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'culture', 'age', 'gender', 'frenchSpeaking','soundSet','soundList','cancel' ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }

});

/**
 * Statics
 */
userSchema.statics = {



  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    async((id) => {
      try {
        let user;

        if (mongoose.Types.ObjectId.isValid(id)) {
          user = await (this.findById(id).exec());
        }
        if (user) {
          return user;
        }

        throw new APIError({
          message: 'User does not exist',
          status: httpStatus.NOT_FOUND,
        });
      } catch (error) {
        throw error;
      }
    })
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, culture, age, gender,
  }) {
    const options = omitBy({ culture, age, gender }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
