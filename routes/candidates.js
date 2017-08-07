'use strict'

var express = require('express')
var router = express.Router()
var candidateCtrl = require('../controllers/candidates')

router
    .get('/:id', candidateCtrl.getCandidate)
    .get('/', candidateCtrl.getCandidates)
    .post('/', candidateCtrl.createCandidate)
    .put('/:id', candidateCtrl.updateCandidate)
    .delete('/:id', candidateCtrl.deleteCandidate)

module.exports = router