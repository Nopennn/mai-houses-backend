const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mai_houses');

const schema = new mongoose.Schema({

    user_id : {
        type: mongoose.ObjectId,
        required: true
    },
    token : {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 0
    },
    created : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Auth_token', schema);