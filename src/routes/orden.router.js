const expres = require('express')
const ordenRouter = expres.Router()
const ordenApi = require('../api/orden.api')
const passport = require("passport");


//Genera una orden a partir del id de Carrito a realizar el checkout
ordenRouter.post('/api/ordenes/:id_carrito',passport.authenticate("jwt", { session: false }),ordenApi.createOrden)


module.exports = ordenRouter