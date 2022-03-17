const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Ingrese un mail valido'],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  direccion: {
    type: String,
  },
  edad: {
    type: String,
  },
  telefono: {
    type: String,
  },
  avatar: {
    type: String,
  },
  isAdmin:{
    default:false,
    type:Boolean,
  }
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("User", UserSchema);
