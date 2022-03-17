const fs = require("fs"),
request = require("request");
const { v4: uuidv4 } = require("uuid");
const  downloadImage = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);
    console.log(__dirname)

    try {

        request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    } catch (error) {
        console.log('error guardando')
    }
  });
};
module.exports = downloadImage


