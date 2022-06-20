var express = require('express');
const userController  = require('../controllers/user.controller');
const userValidator = require('../middlewares/validators/user.validator');
var router = express.Router();



/*
      login
*/
router.get('/login', (req, res)=>{
  res.render('login')
})

router.post('/login', userController.login)


/*
      Signup
*/
router.get('/signup', (req, res)=>{
  res.render('signup')
})

router.post('/signup',userValidator,userController.signup);


module.exports = router;
 