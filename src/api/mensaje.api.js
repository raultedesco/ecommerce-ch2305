const Mensaje = require("../models/Mensaje.model");
const logger = require('../config/logger')

module.exports = {
    getMensajes: async (req, res) => {
        try {
          const result = await Mensaje.find();
          logger.info(result);
          return res.json(result);
        } catch (error) {
          logger.info(error);
        }
      }
};
