const multer=require('multer')
const path=require('path')

// configure storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
})

// file filter for image
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'));
    }
  };

// initialize multer
const upload=multer({
    storage,
    fileFilter,
})

module.exports=upload