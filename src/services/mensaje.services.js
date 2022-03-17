const Mensaje = require("../models/Mensaje.model");
const logger = require("../config/logger");
const ApiError = require("../error/ApiError");

module.exports = {
  getMensajes: async () => {
    try {
      const result = await Mensaje.find();
      logger.info(result);
      return res.json(result);
    } catch (error) {
      logger.info(error);
    }
  },
  saveMensaje: async (data) => {
    console.log(data)
    const { nombre, mensaje } = data;
    dataToSave = {
      email: nombre,
      type: "Cliente",
      description: mensaje,
    };

    try {
      const result = await Mensaje.create(dataToSave);
    } catch (error) {}
  },
};
