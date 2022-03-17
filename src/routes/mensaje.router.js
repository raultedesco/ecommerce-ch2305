const expres = require('express')
const mensajeRouter = expres.Router()
const mensajeApi= require('../api/mensaje.api')

mensajeRouter.get('/api/mensajes/',mensajeApi.getMensajes)

module.exports = mensajeRouter