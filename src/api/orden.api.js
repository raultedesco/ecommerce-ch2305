const Orden = require("../models/orden.models");
const Carrito = require("../models/carrito.model");
const config = require('../config/config')
const sendNoticationMail  = require('../utils/sendMail')
module.exports = {
  createOrden: async (req, res) => {
    const { id_carrito } = req.params;
    const {mail} = req.body
    const carrito_for_checkout = await Carrito.findOne({ _id: id_carrito });
    if (carrito_for_checkout) {
      const data_for_orden = {
        items: carrito_for_checkout.items,
        subTotal: 345,
        mail: mail,
      };
      try {
        // se crea la orden con al informacion del carrito
        const result = await Orden.create(data_for_orden);
        
        try {
          //Se vacia el carrito
          carrito_for_checkout.items = [];
          carrito_for_checkout.subTotal = 0;
          let data = await carrito_for_checkout.save();
          //Se envia mail con la notificacion
          try {
            options = {
              from: '"Ecommerce Free Products 👻" <foo@example.com>', // sender address
              to: config.adminMail, // list of receivers
              subject: "Nueva Orden Registrada", // Subject line
              text: "Se a registrado un nueva Orden", // plain text body
              html: `Data:${JSON.stringify(data_for_orden)}`, // html body
            }
            await sendNoticationMail(options)

        } catch (error) {
            logger.info(error)
        }
          //se devuelve el resultado con la informacion del orden
          res.json(result);
        } catch (error) {}
      } catch (error) {
        res.status(400).json({ message: "algo salio mal" });
      }
    } else {
      res.status(500).json({ message: "Carrito no Encontrado" });
    }
  },
};
