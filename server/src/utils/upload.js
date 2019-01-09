const multer = require('multer');
const path = require('path');

//Load configurations
const init = require('../config/init');

//Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, init.uploadPath + file.fieldname);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname)
    );
  }
});

//Create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

module.exports = upload;
