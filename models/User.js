//const db = require('../ext/db')
const mongoose = require('mongoose');
const uri = "mongodb+srv://Makar:1111@cluster0.egdh5vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

const schema = new mongoose.Schema({

    login : {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 2
    },
    password : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        select: false
    },
    name : {
        type: String,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    surname : {
        type: String,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    photo : {
        type: String,
        trim: true
    },
    email : {
        type: String,
        maxlength: 255,
        minlength: 2,
        trim: true
    },
    phone : {
        type: String,
        maxlength: 20,
        minlength: 2,
        trim: true
    },
    age : {
        type: Number
    },
    gender : {
        type: String,
        maxlength: 4,
        minlength: 1,
        trim: true
    },
    about : {
        type: String,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    wanted : {
        type: String,
        maxlength: 255,
        minlength: 0,
        trim: true
    },
    role : {
        type: String,
        maxlength: 30,
        minlength: 0,
        trim: true
    },
    tags : {
        type: Array,
    },
    created : {
        type: Date,
        default: Date.now()
    }
})



module.exports = mongoose.model('User', schema);
