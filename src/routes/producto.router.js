const expres = require('express')
const productoRouter = expres.Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')

const productoApi = require('../api/producto.api')
//middleware para verificar que el user sea admin
const isAdmin = require("../auth/isAdmin");

productoRouter.post('/api/productos',productoApi.createProducto)
// productoRouter.post('/api/productos',isAdmin,productoApi.createProducto)
productoRouter.get('/api/productos',productoApi.getProductos)
productoRouter.get('/api/productos/:idProducto',passport.authenticate("jwt", { session: false }),isAdmin,productoApi.getProductoById)
productoRouter.delete('/api/productos/:idProducto',passport.authenticate("jwt", { session: false }),isAdmin,productoApi.deleteProductoById)
productoRouter.put('/api/productos/:idProducto',passport.authenticate("jwt", { session: false }),isAdmin,productoApi.updateProductoById)


module.exports = productoRouter