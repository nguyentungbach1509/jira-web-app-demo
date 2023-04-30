/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: 'string',
      email: true,
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      
    },

    googleId: {
      type: 'string',
      
    },

    outLookId: {
      type: 'string'
    }
    
  },

};

