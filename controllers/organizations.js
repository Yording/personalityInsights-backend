'user strict';

// Dependencias
var executeQuery = require('../middlewares/executequery');

// Variables
var query = '';

module.exports = {
    getOrganization: function(req, res) {
        query = "SELECT [id], [name], [description], [date_created] FROM [dbo].[organization] WHERE [id] = " + req.params.id;
        executeQuery(res, query);
    },
    getOrganizations: function(req, res) {
        req.query.filter = req.query.filter || '';
        query = "SELECT [id], [name], [description], [date_created] FROM [dbo].[organization] WHERE [name] LIKE '%" + req.query.filter + "%' OR [description] LIKE '%" + req.query.filter + "%'";
        executeQuery(res, query);
    },
    createOrganization: function(req, res) {
        query = "INSERT INTO [dbo].[organization] ([name], [description], [date_created]) VALUES ('" + req.body.name + "', '" + req.body.description + "', GETDATE())";
        executeQuery(res, query);
    },
    updateOrganization: function(req, res) {
        query = "UPDATE [dbo].[organization] SET [name] = '" + req.body.name + "', [description] = '" + req.body.description + "' WHERE [id] = " + req.params.id;
        executeQuery(res, query);
    },
    deleteOrganization: function(req, res) {
        query = "DELETE FROM [dbo].[organization] WHERE [id] = " + req.params.id;
        executeQuery(res, query);
    }
}