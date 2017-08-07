'user strict'

// Dependencias
var executeQuery = require('../middlewares/executequery')

// Variables
var query = ''

module.exports = {
    // Funcion para retornar un candidato especifico de un psicolog
    getCandidate: function(req, res) {
        query = "SELECT C.[id_user], C.[name], C.[last_name] FROM [dbo].[candidate] C WHERE C.[id_user] = " + req.params.id;
        executeQuery(res, query)
    },
    getCandidates: function(req, res) {
        req.query.filter = req.query.filter || '';
        query = `SELECT C.[id_user], C.[name], C.[last_name] FROM [dbo].[candidate] C WHERE C.[name] LIKE '%${req.query.filter}%' OR C.[last_name] LIKE '%${req.query.filter}%'`;
        executeQuery(res, query)
    },
    createCandidate: function(req, res) {
        query = "INSERT INTO [dbo].[candidate] ([id_user], [name], [last_name]) VALUES (" + req.body.id_user + ", '" + req.body.name + "', '" + req.body.last_name + "')"
        executeQuery(res, query)
    },
    updateCandidate: function(req, res) {
        query = "UPDATE [dbo].[candidate] SET [name] = '" + req.body.name + "', [last_name] = '" + req.body.last_name + "' WHERE [id_user] = " + req.params.id
        executeQuery(res, query)
    },
    deleteCandidate: function(req, res) {
        query = "DELETE FROM [dbo].[candidate] WHERE [id_user] = " + req.params.id
        executeQuery(res, query)
    }
}