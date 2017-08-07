'use strict'

const services = require('../services/token')

module.exports = {
    isPermmisionAdmin: function  (req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];  
        services.decodeToken(token)
            .then(function(response){
                //Validacion de que el usuario este registrado como administrador
                if(response.rol_id > 2){
                    req.user = response
                    next()
                }
                else{
                    res.status(401).send({message: 'No tienes privilegios de administrador'})
                }
                
            })
            .catch(function(err){
                res.status(err.status).send({message:err.message})
            })
    }
}