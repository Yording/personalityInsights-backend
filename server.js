'use strict'

// Depedencias
var sql = require('mssql')
var config = require('./config')
var app = require('./app')

// Funcion para conectar a la base de datos
sql.connect(config.dbConfig, function(err) {
    if (err) {
        console.log("Error al conectarse a la base de datos:- " + err)
        throw err
    } else {
        app.listen(config.port, function(err) {
            if(err){
                console.log("Error al correr el servidor:- " + err)
            }
                
            console.log("Corriendo aplicación sobre el puerto", config.port);
        })
    }
})


