const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MensajeSchema = new Schema(
  {
    email: {
      type: String,
    },
    type: {
      type: String,
    },
    timestamp: { type: Date, default: Date.now },
    description: {
      type: String,
    },
  }
);

module.exports = mongoose.model("Mensaje", MensajeSchema);
