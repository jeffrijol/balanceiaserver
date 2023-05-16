const mongoose = require('mongoose');

const UserSchema = mongoose.Schema( {
    email: {
        type : String,
        required : true
    },
    pass : {
        type : String,
        required : true,
        select:false
    },
    avatar : {
        type : String,
        required : false
    },
    displayName : {
        type : String,
        required : false
    },
    signupDate : {
        type:Date, default: Date.now(), required : false
    },
    lastLogin : {
        type:Date, required : false
    },
    userId: {
        type : String,
        required : true
    }
} );


module.exports = mongoose.model('users', UserSchema);