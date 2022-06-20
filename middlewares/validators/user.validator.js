const { Validator } = require('node-input-validator');

const userValidator = (req, res, next) => {
     
    const v = new Validator(req.body, {
        userName: 'required',
        firstName: 'required',
        lastName: 'required',
        email: 'required|email',
        password : 'required',
        passwordConfirm : 'required|same:password'

    });

    v.check().then((matched) => {
        if(!matched) {
            //error
        console.log(v.errors);
        req.flash('errorForm', v.errors);
        return res.redirect('/users/signup');
        }
        next()
    })

}

module.exports = userValidator;