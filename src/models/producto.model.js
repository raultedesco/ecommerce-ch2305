const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },

});


module.exports = mongoose.model("Producto", ProductoSchema);
