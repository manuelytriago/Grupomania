
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/:id/',auth,commentCtrl.getAllComment);
router.post('/',auth,multer ,commentCtrl.createComment ); 
router.get('/:id/:idComment/',auth,commentCtrl.getOneComment);
//router.put('/:id',auth ,multer, commentCtrl.modifyComment);
//router.delete('/:id',auth ,commentCtrl.deleteComment);
    
module.exports = router;