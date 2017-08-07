'use strict'

var express = require('express')
var router = express.Router()
var psychologistCtrl = require('../controllers/psychologists')

router
    .get('/', psychologistCtrl.getPsychologists)
    .get('/:id', psychologistCtrl.getPsychologist)
    .get('/:id_user/getCandidates/:id', psychologistCtrl.getCandidate)
    .get('/:id_user/getCandidates/', psychologistCtrl.getCandidates)
    // .post('/', psychologistCtrl.createPsychologist)
    .put('/:id', psychologistCtrl.updatePsychologist)
    .delete('/:id', psychologistCtrl.deletePsychologist)

module.exports = router