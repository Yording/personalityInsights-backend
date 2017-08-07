'use strict'

// Depedencias
var executeQuery = require('../middlewares/executequery')
var service = require('../services/token')
    // Variables
var query = ''

module.exports = {
    // Seleccionar todos los usuarios de la base de dato
    getUsers: function(req, res) {
        query = "select [id], [rol_id], [nick], [email] from [user]"
        executeQuery(res, query)
    },
    getUser: function(req, res) {
        query = "select 1 as ok from [user] where id = " + req.params.id
        executeQuery(res, query)
    },
    // Función para crear un nuevo usuario
    createUser: function(req, res) {
        console.log(`INSERT INTO [user] ([id],[rol_id], [nick], [email]) VALUES (${req.body.id_user},1, '${req.body.nick}', '${req.body.email}'); INSERT INTO [dbo].[psicologist] ([id_user], [id_plan], [name], [last_name]) VALUES (${req.body.id_user}, 1, '${req.body.name}', '${req.body.last_name}')`)
        query = `INSERT INTO [user] ([id],[rol_id], [nick], [email]) VALUES (${req.body.id_user},1, '${req.body.nick}', '${req.body.email}'); INSERT INTO [dbo].[psicologist] ([id_user], [id_plan], [name], [last_name]) VALUES (${req.body.id_user}, 1, '${req.body.name}', '${req.body.last_name}')`
        executeQuery(res, query)
    },
    // Actualizar un usuario existente en la b.d
    updateUser: function(req, res) {
        query = "UPDATE [user] SET nick = '" + req.body.nick + "' , email=  '" + req.body.email + "'  WHERE Id= " + req.params.id
        executeQuery(res, query)
    },
    // Eliminar un usuario de la b.d
    deleteUser: function(req, res) {
        query = "DELETE FROM [user] WHERE Id = " + req.params.id
        executeQuery(res, query)
    },
    signIn: function(req, res) {
        var sql = require('mssql')
        query = `select [id], [rol_id], [nick], [email] from [user] where email = '${req.body.email}'`
            // crear un objecto request
        var request = new sql.Request();
        // query
        request.query(query, function(err, user) {
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).send(err);
            }
            else{
                if (user.recordset.length == 0) {
                    res.status(404).send({ message: 'No existe el usuario' })
                }
                else{
                    req.user = user
                    res.status(200).send({
                        message: "Te has logueado correctamente",
                        token: service.createToken(user)
                    })
                }
                
            }

        });
    }
}