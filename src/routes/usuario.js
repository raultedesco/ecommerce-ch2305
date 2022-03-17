const express = require('express')
const routerUsuario = express.Router()
const userController = require('../api/usuario.api')
// import { getController, postController } from '../controladores/index.js'


routerUsuario.get('/api/info', userController.getUser)

module.exports = routerUsuario