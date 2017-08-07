'use strict'

// Depedencias
var express = require('express')
var router = express.Router()
var userRoute = require('./routes/users')
var planRoute = require('./routes/plans')
var organizationRoute = require('./routes/organizations')
var candidateRoute = require('./routes/candidates')
var studyRoute = require('./routes/studies')
var analysisRoute = require('./routes/analysis')
var psychologistRoute = require('./routes/psychologists')


router
    .use('/users', userRoute) //Ruta de usuarios
    .use('/plans', planRoute) //Ruta de los planes
    .use('/organizations', organizationRoute) //Ruta de las organizaciones
    .use('/candidates', candidateRoute) //Ruta de los candidatos
    .use('/studies', studyRoute) //Ruta de los estudios
    .use('/analysis', analysisRoute) //Ruta de los analisis
    .use('/psychologists', psychologistRoute) //Ruta de los psicologos

module.exports = router