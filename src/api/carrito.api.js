const Carrito = require("../models/carrito.model");
const Producto = require("../models/producto.model");
const logger = require("../config/logger");

module.exports = {
  addItem: async (req, res) => {
    //id de Carrito
    const { id } = req.params;
    //id de Producto agregar
    const { productId, price } = req.body;
    try {
      //traigo el carrito
      const car = await Carrito.findById(id);
      //Traigo producto
      let productDetails = await Producto.findById(productId);
      logger.info(productDetails)

      if (!productDetails) {
        return res.status(500).json({
          type: "Producto no Encontrado",
          msg: "Peticion invalida",
        });
      }
      // Si el carrito existe
      if (car) {
        logger.info(car);
        const quantity = Number.parseInt(req.body.quantity);

        //---- Verificar que el id de producto se haya encontrado ----
        const indexFound = car.items.findIndex(
          (item) => item.productId._id == productId
        );
        // Si la cantidad es 0 se remueve el producto del carrito
        if (indexFound !== -1 && quantity <= 0) {
          car.items.splice(indexFound, 1);
        }
        //Si el producto existe, se le suma la cantidad a la existente
        else if (indexFound !== -1) {
          car.items[indexFound].quantity =
            car.items[indexFound].quantity + quantity;
          car.items[indexFound].price = productDetails.price;
        }
        //Si cantidad es mayor a 0 se agrega el producto al array de Items
        else if (quantity > 0) {
          car.items.push({
            productId: productId,
            quantity: quantity,
            price: productDetails.price,
          });
        } else {
          return res.status(400).json({
            type: "Invalid",
            msg: "Peticion Invalida",
          });
        }
        //Finalmente se graba el carrito en la mongodb y se envia el response
        let result = await car.save();
        res.status(200).json({
          type: "success",
          mgs: "Process successful",
          data: result,
        });
      } else {
        res.status(400).json({ message: "Carrito no Encontrado" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Algo salio mal en la peticion" });
    }
  },
  createCarrito: async (req, res) => {
    try {
      const { email, direccion } = req.body;
      const result = await Carrito.create({ email, direccion });
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "algo salio mal" });
    }
  },
  getCarritoById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Carrito.findOne({ _id: id });
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "algo salio mal" });
    }
  },
  deleteCarritoById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Carrito.deleteOne({ _id: id });
      console.log(result);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "algo salio mal" });
    }
  },
  emptyCarritoById: async (req, res) => {
    try {
      const { id } = req.params;
      let car = await Carrito.findOne({ _id: id });
      car.items = [];
      car.subTotal = 0;
      let data = await car.save();
      res.status(200).json({
        type: "success",
        mgs: "Carrito Vaciado",
        data: data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        type: "Invalid",
        msg: "Algo Salio mal!",
        err: err,
      });
    }
  },
};
