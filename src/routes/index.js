const express = require("express");
const router = express.Router();
const config = require("../config/config");
const logger = require('../config/logger')
/* Multer config */
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.email}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const passport = require("passport");
const jwt = require("jsonwebtoken");

// Home Page
// router.get("/", function (req, res, next) {
//   res.json("Home Page");
// });

router.post("/upload", upload.single("avatar"), (req, res) => {
  res.json({ message: "imagen avatar subida" });
});

const signupUpload = upload.fields([{ name: "avatar", maxCount: 1 }]);

router.post(
  "/signup",
  signupUpload,
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        logger.info(err);
        const error = new Error("new Error");
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        const body = {
          _id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        };

        const token = jwt.sign(
          { user: body, 
            //Tiempo de Expiracion JWT --> seteado en 1 hora
            exp: Math.floor(Date.now() / 1000) + config.exp_jwt_sec * config.exp_jwt_min
          },

          "top_secret"
        );
        return res.json({ token });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

//middleware para verificar que el user sea admin
const isAdmin = require("../auth/isAdmin");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res, next) => {
    logger.info(req.url);
    logger.info(req.user);
    logger.info(req.user.isAdmin);
    logger.info(req.header("authorization"));

    res.json({
      message: "Autorizado!!!",
      user: req.user,
      // token: req.query.secret_token,
      token: req.header("authorization").split(" ")[1],
    });
  }
);


const User = require('../models/usuario.model')
//Ruta para cambiar el flag de un user para hacer lo admin, ya que por default es False, se busca por email
//Solo creada para poder testear via thunder cliente o Postman
router.post(
  "/setFlagAdmin",
  async (req, res) => {
    logger.info(req.body.email)
    logger.info(req.body.isAdmin)
      try {
        const result = await User.updateOne({email:req.body.email},{isAdmin:req.body.isAdmin})
        res.json(result)
      } catch (error) {
        
      }
  }
);

module.exports = router;
