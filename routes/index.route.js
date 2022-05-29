var express = require('express');
const articleController = require('../controllers/article.controller');
const multerConfig = require('../middlewares/multer.config');
// const Article = require('../models/article.model');
// const Category = require('../models/category.model');
var router = express.Router();

/* GET home page. */
router.get('/', articleController.list);

router.get('/article/:id',articleController.show );

router.get('/add-article', articleController.add);

router.post('/add-article', multerConfig ,articleController.addOne);

module.exports = router; 
