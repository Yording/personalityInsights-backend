'user strict'

// Dependencias
var executeQuery = require('../middlewares/executequery')

// Variables
var query = ''

module.exports = {
    getPlan: function(req, res) {
        console.log(req.user)
        // if(req.user.rol_id == 3){
            query = "SELECT [id], [name], [description], [amount_analysis], [price] FROM [dbo].[plan] WHERE [id] = " + req.params.id
            executeQuery(res, query)
        // }
        // else{
        //     res.status(401).send({message: 'No tienes privilegios de administrador'})
        // }
    },
    getPlans: function(req, res) {
        query = "SELECT [id], [name], [description], [amount_analysis], [price] FROM [dbo].[plan]"
        executeQuery(res, query)
    },
    createPlan: function(req, res) {
        query = "INSERT INTO [dbo].[plan] ([name], [description], [amount_analysis], [price]) VALUES ('" + req.body.name + "', '" + req.body.description + "', " + req.body.amount_analysis + ", " + req.body.price + ")"
        executeQuery(res, query)
    },
    updatePlan: function(req, res) {
        query = "UPDATE [dbo].[plan] SET [name] = '" + req.body.name + "', [description] = '" + req.body.description + "', [amount_analysis] = " + req.body.amount_analysis + ", [price] = " + req.body.price + " WHERE [id] = " + req.params.id
        executeQuery(res, query)
    },
    deletePlan: function(req, res) {
        query = "DELETE FROM [dbo].[plan] WHERE [id] = " + req.params.id
        executeQuery(res, query)
    }
}