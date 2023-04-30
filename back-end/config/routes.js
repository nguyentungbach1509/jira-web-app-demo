/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    //GET REQUEST
    'GET /users': 'UserController.getUsers',
    'GET /api/v1/auth/google': 'UserController.googleAuth',
    'GET /api/v1/auth/google/callback': 'UserController.googleCallback',
    'GET /api/v1/auth/usergoogle' : 'UserController.getUserGoogle',
    'GET /projects/all' : 'ProjectController.getProjects',
    'GET /projects/project' : 'ProjectController.getProject',
    'GET /issues/some' :  'IssueController.getIssues',
    'GET /issues/issue' : 'IssueController.getOneIssue',
    //POST REQUEST
    'POST /users/login' : 'UserController.login',
    'POST /projects/create' : 'ProjectController.createProject',
    'POST /projects/update' : 'ProjectController.updateProject',
    'POST /users/signup': 'UserController.signup',
    'POST /issues/create' : 'IssueController.createIssue',
    'POST /issues/status' : 'IssueController.changeIssueStatus',
    'POST /issues/update' : 'IssueController.updateIssue',
    'POST /issues/issue/addcomments' : 'IssueController.updateIssueComments',
    'POST /issues/search' : 'IssueController.searchIssues',
    //DELETE REQUEST
    'DELETE /issues/delete' : 'IssueController.deleteIssue',
    'DELETE /projects/delete' : 'ProjectController.deleteProject',
};
