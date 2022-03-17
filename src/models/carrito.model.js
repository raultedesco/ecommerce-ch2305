const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "La cantidad de productos no puede ser inferior a 1."],
    },
    price: {
      type: Number,
      required: true
    },
  },
  // {
  //   timestamps: true,
  // }
);
const CarritoSchema = new Schema(
  {
    items: [ItemSchema],
    timestamp: { type: Date, default: Date.now },
    email: {type: String},
    direccion: {type: String},
  },
  // {
  //   timestamps: true,
  // }
);
module.exports = mongoose.model("Carrito", CarritoSchema);
