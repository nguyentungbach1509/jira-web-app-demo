/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    p_name: {
      type: 'string',
      required: true
    },

    p_description: {
      type: 'string'
    }, 

    p_category: {
      type: 'string',
      required: true
    },

    p_start_date: {
      type: "string",
      required: true
    },

    p_due_date: {
      type: "string",
      required: true
    },
    

  },

};

