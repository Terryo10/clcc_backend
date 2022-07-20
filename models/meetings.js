const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meeting_id:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    user_id:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    permitted_users:{
        type:Array,
        default:[]
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

module.exports = mongoose.model('Meeting', meetingSchema);