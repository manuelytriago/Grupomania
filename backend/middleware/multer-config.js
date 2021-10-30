const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'video/mp4': 'mp4',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    if(extension === 'jpg' || extension === 'jpeg' ||extension === 'png'){
      callback(null, '../frontend');
    }
    if(extension === 'mp4'){
      callback(null, '../frontend');
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');