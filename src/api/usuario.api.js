const User = require("../models/usuario.model");

module.exports = {
  getUser: async (req, res) => {
    const users = await User.find();
    return res.json(users);
  },
};
