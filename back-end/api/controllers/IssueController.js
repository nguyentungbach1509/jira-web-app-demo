/**
 * IssueController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createIssue: async(req, res) => {
    try {
        await Issue.create({...req.body.issue});
    
        return res.json({mess: "Issue was created successfully!!", type: 0});
    }
    catch(err) {
        return res.json({mess: "Failed to create issues!!", type: 1});
    }
  },

  getIssues: async (req, res) => {
    try {
      const issues = await Issue.find({p_id: req.query.id});
      return res.json({issues});
    }
    catch(err) {
      return res.json({err});
    }
  },

  changeIssueStatus: async(req, res) => {
    try {
      await Issue.updateOne({id: req.body.id}).set({
        i_status: req.body.status
      });
      return res.json({mess: "Success!"});
    }
    catch(err) {
      return res.json({mess: err});
    }
   
  },

  getOneIssue: async(req, res) => {
    try {
      const issue = await Issue.find({id: req.query.id});
      return res.json({issue});
    }
    catch(err) {
      return res.json(err);
    }
  },

  updateIssue: async(req, res) => {
    try{ 
      await Issue.updateOne({id: req.body.id}).set({
        i_summary: req.body.issue.i_summary,
        i_type: req.body.issue.i_type,
        i_description: req.body.issue.i_description,
        i_reporter: req.body.issue.i_reporter,
        i_assign: req.body.issue.i_assign,
        i_prio: req.body.issue.i_prio,
        i_status: req.body.issue.i_status,
        i_start_date: req.body.issue.i_start_date,
        i_due_date: req.body.issue.i_due_date,
      });  

      return res.json({mess: "Issue was updated successfully!", type: 0});

    }catch(err) {
      return res.json({mess:"Failed to update Issue!", type:1});
    }
  },

  updateIssueComments: async(req, res) => {
    try {
      const issue = await Issue.find({id: req.body.id});
      const updated = await Issue.updateOne({id: req.body.id}).set({
        i_comments: issue[0].i_comments ? [...issue[0].i_comments, {user: req.body.user, comment: req.body.comment}] : [ {user: req.body.user, comment: req.body.comment}],
      });
      return res.json({issue: updated});
    }
    catch(err) {
      return res.json({mess: err.message});
    }
  },

  deleteIssue: async(req, res) => {
    try {
      await Issue.destroy({id: req.query.id});
      return res.json({mess: "Issue was deleted successfully!", type: 0});
    }
    catch(err) {
      return res.json({mess: "Failed to delete Issue!", type: 1});
    }
  },

  searchIssues: async (req, res) => {
    try {
      const issues = await Issue.find({
        where: {
          p_id: req.body.id,
          or: [
            {i_type: {contains: req.body.search}},
            {i_summary: {contains: req.body.search}},
            {i_description: {contains: req.body.search}},
            {i_reporter: {contains: req.body.search}},
            {i_prio: {contains: req.body.search}},
            {i_status: {contains: req.body.search}},
          ]
          
      }});
      return res.json({issues});
    }
    catch(err) {
      return res.json(err);
    }
  }

};

