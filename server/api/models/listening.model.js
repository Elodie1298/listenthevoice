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
const listeningSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  emotion: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userIdObj: {
    type: mongoose.Types.ObjectId,
    required: false
  }
}, {
  timestamps: true,
});



/**
 * Methods
 */
listeningSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id', 'name', 'emotion', 'category', 'userId', 'userIdObj' ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }

});

/**
 * Statics
 */
listeningSchema.statics = {



  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of listening.
   * @returns {Promise<Listening, APIError>}
   */
  get(id) {
    async((id) => {
      try {
        let listening;

        if (mongoose.Types.ObjectId.isValid(id)) {
          listening = await (this.findById(id).exec());
        }
        if (listening) {
          return listening;
        }

        throw new APIError({
          message: 'Listening does not exist',
          status: httpStatus.NOT_FOUND,
        });
      } catch (error) {
        throw error;
      }
    })
  },

  /**
   * List listenings in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, name, emotion, category, userId
  }) {
    const options = omitBy({ name, emotion, category, userId }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  }
};

/**
 * @typedef Listening
 */
module.exports = mongoose.model('Listening', listeningSchema);
