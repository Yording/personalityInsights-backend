'use strict'

var jwt = require('jsonwebtoken')
var config = require('../config')

module.exports = {
    createToken: function(user){    
        return jwt.sign(user, config.SECRET_TOKEN,{
            expiresIn: '1h',
        })
    },
    decodeToken: function(token){
        var decoded = new Promise(function(resolve, reject){
            if(token){
                var payload = jwt.verify(token, config.SECRET_TOKEN, function(err, decoded){
                        
                    try{
                        if(err)
                            throw err

                        resolve(decoded.recordset[0])
                    }
                    catch(err){
                        console.log(err)
                        if(err.name='TokenExpiredError' && err.message =='jwt expired'){
                            reject({
                                status: 401,
                                message: 'El token ha expirado'
                            })
                        }else{
                            reject({
                                status: 500,
                                message: 'Fallido el TOKEN de autentificación.'
                            })
                        }
                        
                    } 
                })
            }
            else{
                reject({
                    status: 403,
                    message: 'No hay TOKEN proporcionado!.'
                })
            }
        })
        return decoded
    }
}