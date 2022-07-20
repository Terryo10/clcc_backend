const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    type:{
        type:String,
        default:'user',
        max:255,
        min:6
    },
    password: {
        type:String,
        required:true,
        max:1024,
        min:6

    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);