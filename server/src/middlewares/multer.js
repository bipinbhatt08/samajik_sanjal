const multer = require("multer");

var storage = multer.diskStorage({

  destination: function (req, file, cb) {

    // logic to validate file type(mimeType)

    // ani size chai file.size ma aauxa ani value byte ma hunxa

    const allow = [ 'image/jpeg','image/png','image/jpg','']//mimetype 
    if(!allow.includes(file.mimetype)){
        return cb(new Error("Invalid file type. Only supports: jpeg,png and jpg"))
    }

    cb(null, "./public/uploads/") 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})
const upload = multer({ storage });
module.exports =  {upload}//curly braket because it is a object thanks hahahah
