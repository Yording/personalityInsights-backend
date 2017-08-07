'use strict'

// Dependencias
var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes')

// Variables
var app = express()

// Middlewares
app
    // body parser middlware
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:false}))
    // CORS middleware
    .use(function(req, res, next){
        // Habilitar CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
        next();
    })
    // Añadir todas las rutas sobre api
    .use('/api', routes)

module.exports = app