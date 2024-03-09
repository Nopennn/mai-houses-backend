//const db = require('../ext/db')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mai_houses');

const schema = new mongoose.Schema({

    user_id : {
        type: mongoose.ObjectId,
        required: true
    },
    email : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    phone : {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 2,
        trim: true
    },
    about : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    comment_from_moderator : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    wanted : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    adress : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    price : {
        type: String,
        required: true,
        maxlength: 10,
        minlength: 0,
        trim: true
    },
    type : {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 0,
        trim: true
    },
    publish_mode : {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 0,
        trim: true
    },
    tags : {
        type: Array,
        required: true
    },
    created : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Ad', schema);