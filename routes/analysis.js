'use strict'

var express = require('express')
var router = express.Router()
var analysisCtrl = require('../controllers/analysis')

router
    .get('/psychologist/:id_user', analysisCtrl.getAnalysiss)
    .get('/:id', analysisCtrl.getAnalysis)
    .get('/parsingAnalysis/:id', analysisCtrl.parsingAnalysis)
    .post('/', analysisCtrl.createAnalysis)
    .put('/:id', analysisCtrl.updateAnalysis)
    .delete('/:id', analysisCtrl.deleteAnalysis)

module.exports = router