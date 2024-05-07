const express = require('express'),
    router = express.Router(),
    { ObjectId } = require('mongodb')

const jwt = require('jsonwebtoken')
const {upd_user_validator} = require('../validators/upd_user_validator')
const {user_creation_validator} = require('../validators/user_creation_validator')
const check_token = require('../check_token')
const {secret} = require('../config')


const createToken = (user_id) => {
    const pay_load = {user_id}
    token = jwt.sign(pay_load, secret, {expiresIn:"24h"})
    return token
}

const User = require('../models/User')
const Ad = require('../models/Ad')
const Auth_token = require('../models/Auth_token')

router.route('/update/').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let token = req.body.token
    let user_id = check_token(token)
    console.log(user_id)
    if (!user_id) {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    } 
    else if (upd_user_validator(req.body)) {res.status(403).json({"message" : "Недопустимые значения полей"})} 
    else {
        const user = await User.findOne({ "_id": user_id }).exec()
        if (user) {
            result = await user.updateOne({
            "login": req.body.login,
            "password": req.body.password,
            "email": req.body.email,
            "phone": req.body.phone,
            "name": req.body.name,
            "surname": req.body.surname,
            "age": req.body.age,
            "gender": req.body.gender,
            "tags": req.body.tags,
            "about": req.body.about,
            "wanted": req.body.wanted,
            "photo": req.body.photo,
            })
    
        const ads = await Ad.updateMany({ "user_id": user_id}, {
            "email": req.body.email,
            "phone": req.body.phone,
            "gender": req.body.gender,
            "age": req.body.age,
            "name": req.body.name,
            "surname": req.body.surname
        }); 
        res.json({"message": "success"})
    } else {
            res.json({"message": "fail"})

    }
    }

})

router.route('/signin').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    let user
    //post {"login":,"passsword": }
    try {
	console.log(req.body.login)
	console.log(req.body.password)
        user = await User.findOne({$and:[{"login" : req.body.login}, {"password" : req.body.password}]}).exec()
        console.log(user)
        if (user){
            const token = createToken(user._id, user.role)
            doc = await Auth_token.create({"user_id": user._id, "token": token})
            console.log(doc)
            res.json({"message": "success", "auth_token": token})
        } else {
            res.json({"message": "Нет такого пользователя"})
        }

    }
    catch (err) {
        throw err
    }

})

router.route('/signup').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        user = await User.findOne({'login':req.body.login})
        if (user) {
            res.json({"message": "Такой пользователь существует"})
        } else if(user_creation_validator(req.body)){
            res.status(403).json({"message" : "Недопустимые значения полей"})
        } else {
            user = await User.create({
                "login": req.body.login,
                "password": req.body.password,
                "role": "user"
                })
            res.json({"message":"success"})
        }
    }
    catch (err) {
        res.json({"message":err})
    }

})


router.route('/').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let content = []
    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        try {
            content = await User.find({})
        }
        catch (err) {
            throw err
        }
    
        res.json(content)
    } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/profile').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let profile
    let token = req.body.token
    let user_id = check_token(token)
    if (user_id) {
        try {
            profile = await User.findOne({"_id": user_id}).exec()
        }
        catch (err) {
            throw err
        }
    
        res.json(profile)
    } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/by_tags').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let content = []
    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        let tags = req.body.tags ? req.body.tags : []
        console.log(tags)
        console.log(decoded.user_id)
        try {
            content = await User.find({"tags": { $in: tags } }).exec()
            //console.log(content)
        }
        catch (err) {
            throw err
        }
    
        res.json(content)
    } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})

router.route('/:id').post(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        const id = req.params.id
    let content = []
    try {
        content = await User.findOne({"_id" : id}).exec()
        console.log(content)
    }
    catch (err) {
        throw err
    }
	res.json(content)
        
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }
})



module.exports = router
