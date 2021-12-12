
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/:id/',commentCtrl.getAllComment);
router.post('/',multer ,commentCtrl.createComment ); 
router.get('/:id/:idComment/',commentCtrl.getOneComment);
router.put('/:id',auth ,multer, commentCtrl.modifyComment);
router.delete('/:id',auth ,commentCtrl.deleteComment);
router.post('/:id/like',auth ,commentCtrl.likeComment);
    
module.exports = router;