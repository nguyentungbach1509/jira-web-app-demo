/**
 * Issue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    p_id: {
      type:"string",
      required: true
    },

    i_type: {
      type: 'string',
      required: true,
    },

    i_summary: {
      type: 'string',
      required: true,
    },

    i_description: {
      type: 'string',
    },

    i_reporter: {
      type: 'string',
      required: true
    },

    i_assign: {
      type: 'json',
      required: true
    },

    i_prio: {
      type: 'string',
      required: true
    },

    i_status: {
      type: 'string',
      required: true
    },

    i_comments: {
      type: 'json',
      required: false,
    },

    i_start_date: {
      type: 'string'
    },

    i_due_date: {
      type: 'string',
    }

  },

};

