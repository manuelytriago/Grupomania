
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const replyCtrl = require('../controllers/reply');

router.post('/',auth, multer ,replyCtrl.createReply); 
    
module.exports = router;