'use strict'

var express = require('express')
var router = express.Router()
var planCtrl = require('../controllers/plans')
var permission = require('../middlewares/permissions')

router
    .get('/',permission.isPermmisionAdmin, planCtrl.getPlans)
    .get('/:id', planCtrl.getPlan)
    .post('/', planCtrl.createPlan)
    .put('/:id', planCtrl.updatePlan)
    .delete('/:id', planCtrl.deletePlan)


module.exports = router