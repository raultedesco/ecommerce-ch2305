const downloadImage  =require('../utils/urlImageToDisk')
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();
const imageName = `image-${uuidv4()}.png`
const pathImageDisk = `${process.env.PATHIMAGE}/${imageName}`
console.log(__dirname)

console.log('root dir')
// console.log(appRoot)
downloadImage(
    "https://www.google.com/images/srpr/logo3w.png",
    pathImageDisk,
    // `${process.env.PATHIMAGE}/image-${uuidv4()}.png`,
    function () {
      console.log("done");
    }
  );