//const db = require('../ext/db')
const mongoose = require('mongoose');
const uri = "mongodb+srv://Makar:1111@cluster0.egdh5vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

const schema = new mongoose.Schema({

    login : {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 2,
        trim: true
    },
    password : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2,
        trim: false,
        select: false
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
    age : {
        type: Number,
        required: true
    },
    gender : {
        type: String,
        required: true,
        maxlength: 4,
        minlength: 1,
        trim: true
    },
    about : {
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
    role : {
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



module.exports = mongoose.model('User', schema);
