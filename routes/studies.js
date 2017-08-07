'use strict'

var express = require('express')
var router = express.Router()
var studyCtrl = require('../controllers/studies')

router
    .get('/psychologist/:id_user', studyCtrl.getStudies)
    .get('/:id/psychologist/:id_user', studyCtrl.getStudy)
    .post('/', studyCtrl.createStudy)
    .put('/:id', studyCtrl.updateStudy)
    .delete('/:id', studyCtrl.deleteStudy)

module.exports = router