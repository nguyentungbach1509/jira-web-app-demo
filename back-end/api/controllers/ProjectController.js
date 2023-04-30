/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    createProject: async (req, res) => {
        try {
            await Project.create({
                p_name: req.body.project.pname,
                p_description: req.body.project.pdescription,
                p_category: req.body.project.pcategory,
                p_start_date: req.body.project.startdate,
                p_due_date: req.body.project.duedate,
            });
            
            return res.json({mess: "Project was created successfully!", type: 0});
        }
        catch(err) {
            return res.json({mess:"Failed to create Project!", type:1});
        }
        
    },

    getProjects: async(req, res) => {
        try {
            const projects = await Project.find();
            return res.json({data: projects});
        }
        catch(err) {
            return res.json({data: err});
        }
    },

    getProject: async (req, res) => {
        try {
            const project = await Project.find({id: req.query.id});
            return res.json({data: project});
        }
        catch(err) {
            return res.json({data: err});
        }
    },

    updateProject: async(req, res) => {
        try {
            await Project.updateOne({id: req.body.id}).set({
                p_name: req.body.project.pname,
                p_description: req.body.project.pdescription,
                p_category: req.body.project.pcategory,
                p_start_date: req.body.project.startdate,
                p_due_date: req.body.project.duedate,
            });

            return res.json({mess: "Project was updated successfully!", type: 0});
        }
        catch(err) {
            return res.json({mess:"Failed to update Project!", type:1});
        }
    },

    deleteProject: async (req, res) => {
        try {
            await Project.destroy({id: req.query.id});
            const projects = await Project.find();

            if(projects.length > 0) {
                return res.json({project: projects[0], projects});
            }
            else {
                return res.json({project:null, projects});
            }

        }catch(err) {
            return res.json({err: err.message});
        }
        
    }

};

