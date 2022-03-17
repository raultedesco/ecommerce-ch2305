const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const compression = require('compression')
const logger = require('./src/config/logger');
const cors = require('cors')
global.appRoot = path.resolve(__dirname);
require('dotenv').config()

//Error
const apiErrorHandler = require('./src/error/api_error_handler')
//Routers
const routes = require('./src/routes')
const productoRouter = require('./src/routes/producto.router.js')
const routesUsuario = require('./src/routes/usuario.js')
const carritoRouter = require('./src/routes/carrito.router.js')
const ordenRouter = require('./src/routes/orden.router.js')
const infoRouter = require('./src/routes/info.router')
const mensajeRouter = require('./src/routes/mensaje.router')

//Mensaje service
const mensajeService = require('./src/services/mensaje.services')

mongoose.connect(process.env.MONGO_DB_ATLAS_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
//   useCreateIndex: true,
})

const app = express()

// Socketio
const http = require("http");
const httpServer = http.createServer(app);
//Inicializamos socketio
const socketio = require("socket.io");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (nombre) => {
    logger.info(`${nombre} se a conectado via socket.io`)
  });

  socket.on("mensaje", async (nombre, mensaje) => {
    console.log(nombre,mensaje)
    try {
      mensajeService.saveMensaje({nombre,mensaje})
      
    } catch (error) {
      logger,info('Error tratando de guardar el mensaje')
    }
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} se ha desconectado`,
    });
  });
});


//auth
require('./src/auth/auth')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
// gzip compression
app.use(compression())

// Template Engine EJS
app.set('views', './src/views');
app.set('view engine', 'ejs')

// cors
app.use(cors());
app.options('*', cors());

app.use(routes)
app.use(routesUsuario)
app.use(productoRouter)
app.use(carritoRouter)
app.use(ordenRouter)
app.use(infoRouter)
app.use(mensajeRouter)

//Error Handler
app.use(apiErrorHandler)


const PORT = process.env.PORT || 8081

httpServer.listen(PORT, function () {
  logger.info(`App listening on ${PORT}`)
  })


  // flow MVC 
  // Server.js –> routes –> controller-->api --> models