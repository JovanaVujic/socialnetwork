const multer = require('multer');
const path = require('path');
const init = require('../config/init');
// configure storage
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
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });

module.exports = upload;
