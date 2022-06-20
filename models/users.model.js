const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    userName : {type: String, required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    password: String,
    createdAt: {type: Date, default: Date.now()}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);