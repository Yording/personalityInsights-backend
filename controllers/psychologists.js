'user strict'

// Dependencias
var executeQuery = require('../middlewares/executequery')

// Variables
var query = ''

module.exports = {
    getPsychologist: function(req, res) {
        query = `SELECT [id_user], [id_plan], [name], [last_name], dbo.ufnRemainingAnalisies([id_user]) remaining FROM [dbo].[psicologist] where [id_user] = ${req.params.id}`
        executeQuery(res, query)
    },
    getPsychologists: function(req, res) {
        query = `SELECT [id_user], [id_plan], [name], [last_name], dbo.ufnRemainingAnalisies([id_user]) remaining  FROM [dbo].[psicologist]`
        executeQuery(res, query)
    },
    getCandidate: function(req, res) {
        query = "SELECT C.[id_user], C.[name], C.[last_name] FROM [dbo].[candidate] C INNER JOIN [dbo].[analisys] A ON A.[id_study] = C.[id_user] INNER JOIN [dbo].[study] S ON A.[id_study] = S.[id] WHERE S.[id_psicologist] = " + req.params.id_user + " AND C.[id_user] = " + req.params.id
        executeQuery(res, query)
    },
    getCandidates: function(req, res) {
        query = "SELECT C.[id_user], C.[name], C.[last_name] FROM [dbo].[candidate] C INNER JOIN [dbo].[analisys] A ON A.[id_study] = C.[id_user] INNER JOIN [dbo].[study] S ON A.[id_study] = S.[id] WHERE S.[id_psicologist] = " + req.params.id_user
        executeQuery(res, query)
    },
    // createPsychologist: function(req, res) {
    //     query = "INSERT INTO [dbo].[psicologist] ([id_user], [id_plan], [name], [last_name]) VALUES (" + req.body.id_user + ", 1, '" + req.body.name + "', '" + req.body.last_name + "')"
    //     executeQuery(res, query)
    // },
    updatePsychologist: function(req, res) {
        query = "UPDATE [dbo].[psicologist] SET [name] = '" + req.body.name + "', [last_name] = '" + req.body.last_name + "' WHERE [id_user] = " + req.params.id
        executeQuery(res, query)
    },
    deletePsychologist: function(req, res) {
        query = "DELETE FROM [dbo].[psicologist] WHERE [id_user] = " + req.params.id
        executeQuery(res, query)
    }
}