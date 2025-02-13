const RestApiController = require('../controllers/restApiController.js');
const express = require('express');
const downloader = require('../middleware/downloaderMiddleware.js');
const router = express.Router();

router.get('', RestApiController.getAllPosts);
router.get('/:id', RestApiController.getPostById);
router.post('',downloader.fields([{name: 'image'},{name:'song'}]),(req,res,next)=>{
    console.log(req.fields);
    next();
},RestApiController.createPost);
router.put('/:id',downloader.fields([{name: 'image'},{name:'song'}]), RestApiController.updatePost);
router.delete('/:id', RestApiController.deletePost);

module.exports = router;