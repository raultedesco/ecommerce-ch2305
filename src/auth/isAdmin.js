//Logger
const logger = require('../config/logger')

function isAdmin(req, res, next) {
  if (req.user) {
    console.log(req.user)
    if (req.user.isAdmin) {
      logger.info("User Autorizado, es Admin!");
      next();
    } else {
      res.status(401).json({
        message: "no autorizado, no es un usuario admin",
      });
    }
  }
}
module.exports = isAdmin;
