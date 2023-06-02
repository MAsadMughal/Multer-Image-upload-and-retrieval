const express = require('express');
const { AddImage, getImage } = require('../controllers/ImageControllers');
const router = express.Router();



router.post('/api/v1/addImage', AddImage);
router.get('/api/v1/getImages', getImage);






module.exports = router;