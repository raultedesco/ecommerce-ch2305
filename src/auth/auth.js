//Logger
const logger = require('../config/logger')
//Mail Setup
const sendNotificationMail = require('../utils/sendMail')
//Config Setup
const config = require('../config/config')
//Passport Setup
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require(('../models/usuario.model'))

//JWT Setup
const JWT = require('passport-jwt')
const JWTStrategy = JWT.Strategy
const ExtractJWT = JWT.ExtractJwt

//Signup
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true 
}, async (req,email, password, done) => {
    try {
        const {name,direccion,edad,telefono} = req.body
        const avatar = req.files.avatar[0].filename
        console.log(req.files.avatar[0].filename)
        const user = await User.create({ email, password, name,direccion,edad,telefono,avatar })
        try {
            options = {
              from: '"Fred Foo 👻" <foo@example.com>', // sender address
              to: config.adminMail, // list of receivers
              subject: "Nuevo Registro de Usuario", // Subject line
              text: "Se a registrado un nuevo Usuario", // plain text body
              html: `Data:${email} ${name} ${direccion} ${edad} ${telefono}`, // html body
            }
            await sendNotificationMail(options)

        } catch (error) {
            logger.info(error)
        }
        return done(null, user)
    } catch (e) {
        done(e)
    }
}))


//Login 
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    console.log(email)
    console.log(password)
    try {
    
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
}))


//JWT 
//ExtractJWT.fromAuthHeaderAsBearerToken() para extraer desde AUTH HEADER
passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    try {
        console.log('#######Inside JWT Strategy######')
        console.log(token)
        console.log('################################')
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))
