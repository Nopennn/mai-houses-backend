const mongoose = require('mongoose');
const uri = "mongodb+srv://Makar:1111@cluster0.egdh5vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

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