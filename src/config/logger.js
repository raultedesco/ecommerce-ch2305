const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
    level: 'debug',
    transports : [
        new winston.transports.Console({level:'warn'}),
        new winston.transports.Console({level:'info'}),
        new winston.transports.Console({level:'error'}),
        new winston.transports.File({ filename: config.warn_log_path, level:'warn' }),
        new winston.transports.File({ filename: config.error_log_path, level:'error' }),
    ]
 })

module.exports = logger;
