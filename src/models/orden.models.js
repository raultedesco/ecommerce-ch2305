const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
    quantity: {
      type: Number,
      // required: true,
      min: [1, "La cantidad de productos no puede ser inferior a 1."],
    },
    price: {
      type: Number,
      // required: true
    },
    total: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
const OrdenSchema = new Schema(
  {
    items: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
    state: { default: "Orden Generada", type: String },
    mail: { type: String },
    norden: { type: String, default: uuidv4() },
    timestamp: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Orden", OrdenSchema);
