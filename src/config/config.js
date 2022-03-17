require('dotenv').config()


module.exports = {
    adminMail: process.env.ADMINMAIL,
    persistencia: process.env.PERSISTENCIA,
    exp_jwt_sec: process.env.EXP_JWT_SEC,
    exp_jwt_min: process.env.EXP_JWT_MIN,
    port: process.env.PORT,
    mongodb_str_conect: process.env.MONGO_DB_CONNECTION_STRING,
    mongodb_atlas_str_conect: process.env.MONGO_DB_ATLAS_CONNECTION_STRING,
    warn_log_path: process.env.WARNLOGPATH,
    error_log_path: process.env.ERRORLOGPATH,
}



