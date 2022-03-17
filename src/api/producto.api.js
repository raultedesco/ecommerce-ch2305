const { v4: uuidv4 } = require("uuid");
const Producto = require("../models/producto.model");
const downloadImage = require("../utils/urlImageToDisk");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../error/ApiError");

module.exports = {
  createProducto: async (req, res) => {
    //descargo la imagen desde la url y la guardo en public/images/products con un nombre generado de forma random
    const imageName = `image-${uuidv4()}.png`;
    let imageUrl = "";
    const { image } = req.body;
    logger.info(image);
    const pathImageDisk = `${appRoot}/public/images/products/${imageName}`;
    try {
      downloadImage(image, pathImageDisk, function () {
        logger.info("Imagen guardada");
      });
    } catch (error) {
      logger.info("Error tratando de descargar la imagen");
    }
    const { price, description, category } = req.body;
    data = {
      image: imageName,
      price: price,
      description: description,
      category: category,
    };
    const result = await Producto.create(data);

    return res.json(result);
  },
  getProductos: async (req, res) => {
    try {
      const result = await Producto.find();
      logger.info(result);
      return res.json(result);
    } catch (error) {
      logger.info(error);
    }
  },
  getProductoById: async (req, res, next) => {
    try {
      const { idProducto } = req.params;
      const result = await Producto.findOne({ _id: idProducto });
      if (!result) {
        next(ApiError.notFound("producto no encontrado"));
        return;
      }
      res.json(result);
    } catch (error) {
      logger.info(error);
    }
  },
  deleteProductoById: async (req, res) => {
    const { idProducto } = req.params;
    const result = await Producto.deleteOne({ _id: idProducto });
    if (!result) {
      next(ApiError.notFound("producto no encontrado"));
      return;
    }
    return res.json(result);
  },
  updateProductoById: async (req, res) => {
    const { idProducto } = req.params;
    const { image, price, description, category } = req.body;
    const updatedData = {
      image: image,
      price: price,
      description: description,
      category: category,
    };
    try {
      const result = await Producto.findOneAndUpdate(
        { _id: idProducto },
        updatedData
      );
      if (!result) {
        next(ApiError.notFound("producto no encontrado"));
        return;
      }
      return res.json(result);
    } catch (error) {
      logger.info(error);
    }
  },
};
