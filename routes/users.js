'use strict'

// Depedencias
var express = require('express')
var router = express.Router()
var userCtrl = require('../controllers/users')

router
    .get("/", userCtrl.getUsers) // get users
    .get("/:id",userCtrl.getUser)
    .post("/", userCtrl.createUser) // create user
    .put("/:id", userCtrl.updateUser) // update user
    .delete("/:id", userCtrl.deleteUser) // delete user
    .post('/signin', userCtrl.signIn) //Loguearse recibir token

module.exports = router