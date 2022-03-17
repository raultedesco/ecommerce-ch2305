const config = require('../config/config')
module.exports = {
  getInfo: async (req, res) => {
    const data = {          
        "path" : process.execPath, 
        "plataforma" : process.platform, 
        "pid" : process.pid, 
        "version" : process.version, 
        "directorio" : process.cwd(), 
        "memoria" : process.memoryUsage().rss,
        "config" :JSON.stringify(config)
        
    }
    console.log(data)
    return res.render('info.ejs', { data: data })
  }
};
