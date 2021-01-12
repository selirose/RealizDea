const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const uploadDir = '/img/';
const storageUser = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"user_"+ req.params.id + "_picture" + path.extname(file.originalname))
  }
})



const uploadSingle = multer({
  storage: storageUser,
  // limits:{filesize:10000000},
  // fileFilter:function(req,file,cb){
  //   const filetypes = /pdf|jpeg|jpg|png|gif/;
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = filetypes.test(file.mimetype);
  //   if(mimetype && extname && (file.filesize<1000000)){
  //     return cb(null,true)
  //   } else {
  //     cb(new multer.MulterError('Error, Please Upload Image File Only!'))
  //   }
  // },
  dest: uploadDir,
})

module.exports = {
  single: [
    uploadSingle.single('picture')
  ]
}
