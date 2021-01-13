const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const uploadDir = '/img/';
const storageUser = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"user_"+ req.params.id_user + "_picture" + path.extname(file.originalname))
  }
})

const uploadSingle = multer({
  storage: storageUser,
  dest: uploadDir,
})

const storageSubmission = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"contest_"+ req.params.id_contest + "_participant_" + req.params.id_participant + "_submission_" + file.originalname)
  }
})

const uploadMultiple = multer({
  storage: storageSubmission,
  dest: uploadDir
});

module.exports = {
  single: [
    uploadSingle.single('picture')
  ],

  multiple: [
    uploadMultiple.array('image', 5)
  ]
}
