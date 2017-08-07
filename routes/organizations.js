'use strict';

var express = require('express');
var router = express.Router();
var organizationCtrl = require('../controllers/organizations');

router
    .get('/', organizationCtrl.getOrganizations)
    .get('/:id', organizationCtrl.getOrganization)
    .post('/', organizationCtrl.createOrganization)
    .put('/:id', organizationCtrl.updateOrganization)
    .delete('/:id', organizationCtrl.deleteOrganization);

module.exports = router;