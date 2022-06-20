const User = require('../models/users.model')
const bcrypt = require('bcrypt');

module.exports = {
  login : (req,res,next)=>{

  },

  signup: (req,res,next)=>{
     const newUser = new User({
      userName : req.body.userName,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
     })
  
     User.register(newUser, req.body.password, (err, user)=>{
      if(err){
        req.flash('error', err.message);
        return res.redirect('/users/signup')
      }

      //Authentication

      console.log(user);
     })
  }
}




// signup: (req,res,next)=>{

//   bcrypt.hash(req.body.password, 10, (err, hash)=>{
        
//     if(err) {
//       req.flash('error', err.message);
//       return res.redirect('/users/signup');
//     }

//     const newUser = User({
//       ...req.body,
//       password: hash
      
//     })

//     newUser.save((err, user)=>{
//       if(err){
//           req.flash('error', err.message);
//           return res.redirect('users/signup')
//       }

//       req.flash('error', 'your count has been successfully created. you can log in !');
//           return res.redirect('/users/login')
     

// })

//     console.log(newUser);
//   });

// }