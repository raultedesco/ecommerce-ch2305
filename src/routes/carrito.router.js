const expres = require('express')
const carritoRouter = expres.Router()
const carritoApi = require('../api/carrito.api')
const passport = require("passport");

//get carrito por id
carritoRouter.get('/api/carritos/:id',carritoApi.getCarritoById)
//crea un carrito vacio y devuelve su id
carritoRouter.post('/api/carritos/',carritoApi.createCarrito)
//Agrega un item (producto) al carrito y si la cantidad es 0 lo remueve del carrito
carritoRouter.post('/api/carritos/:id',passport.authenticate("jwt", { session: false }),carritoApi.addItem)
//Borra un carrito por id
carritoRouter.delete('/api/carritos/:id',passport.authenticate("jwt", { session: false }),carritoApi.deleteCarritoById)
//Vacia de item un carrito
carritoRouter.delete('/api/carritos/:id/empty-cart/',carritoApi.emptyCarritoById)

module.exports = carritoRouter

