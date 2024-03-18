//const db = require('../ext/db')
const mongoose = require('mongoose');
const uri = "mongodb+srv://Makar:1111@cluster0.egdh5vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

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
    name : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    surname : {
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
    photo_links : {
        type: Array
    },
    comment_from_moderator : {
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
        type: Number,
        required: true
    },
    type : {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 0,
        trim: true
    },
    age : {
        type: Number,
        required: true
    },
    gender : {
        type: String,
        required: true,
        maxlength: 1,
        minlength: 1,
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