'user strict'

// Dependencias
var executeQuery = require('../middlewares/executequery')

// Variables
var query = ''

module.exports = {
    getStudy: function(req, res) {
        query = `SELECT s.[id]
            ,s.[id_organization]
            ,s.[id_psicologist]
            ,s.[description]
            ,o.[name] organization
            ,ISNULL(sp.[spended], 0) no_analysis
            ,[dbo].[ufnGetConfigVale]('DOMAIN') + '/' + [dbo].[ufnGetConfigVale]('REGISTER_ROUTE') + '/' + cast(s.[id] AS VARCHAR) link
            FROM [dbo].[study] s INNER JOIN
                [dbo].[organization] o ON s.[id_organization] = o.[id] INNER JOIN
                [dbo].[psicologist] ps ON s.[id_psicologist] = ps.[id_user] INNER JOIN
                [dbo].[plan] pl ON ps.[id_plan] = pl.[id] LEFT JOIN
                (SELECT count(1) spended
                    ,a.[id_study]
                    FROM [dbo].[analisys] a
                    INNER JOIN [dbo].[study] s ON a.[id_study] = s.[id]
                    GROUP BY a.[id_study]) sp ON s.[id] = sp.[id_study]
            WHERE s.[active] = 1 AND s.[id_psicologist] = ${req.params.id_user} AND s.[id] = ${req.params.id}`
        executeQuery(res, query)
    },
    getStudies: function(req, res) {
        query = `SELECT s.[id]
            ,s.[id_organization]
            ,s.[id_psicologist]
            ,s.[description]
            ,o.[name] organization
            ,ISNULL(sp.[spended], 0) no_analysis
            ,[dbo].[ufnGetConfigVale]('DOMAIN') + '/' + [dbo].[ufnGetConfigVale]('REGISTER_ROUTE') + '/' + cast(s.[id] AS VARCHAR) link
            FROM [dbo].[study] s INNER JOIN
                [dbo].[organization] o ON s.[id_organization] = o.[id] INNER JOIN
                [dbo].[psicologist] ps ON s.[id_psicologist] = ps.[id_user] INNER JOIN
                [dbo].[plan] pl ON ps.[id_plan] = pl.[id] LEFT JOIN
                (SELECT count(1) spended
                    ,a.[id_study]
                    FROM [dbo].[analisys] a
                    INNER JOIN [dbo].[study] s ON a.[id_study] = s.[id]
                    GROUP BY a.[id_study]) sp ON s.[id] = sp.[id_study]
            WHERE s.[active] = 1 AND s.[id_psicologist] = ${req.params.id_user}`
        executeQuery(res, query)
    },
    createStudy: function(req, res) {
        query = "INSERT INTO [dbo].[study] ([id_organization], [id_psicologist], [description]) VALUES (" + req.body.id_organization + ", " + req.body.id_psicologist + ", '" + req.body.description + "')"
        executeQuery(res, query)
    },
    updateStudy: function(req, res) {
        query = "UPDATE [dbo].[study] SET [description] = '" + req.body.description + "' WHERE [id] = " + req.params.id
        executeQuery(res, query)
    },
    deleteStudy: function(req, res) {
        query = "UPDATE [dbo].[study] SET [active] = 0 WHERE [id] = " + req.params.id
        executeQuery(res, query)
    }
}