const express = require('express'),
    router = express.Router(),
    { ObjectId } = require('mongodb')

const jwt = require('jsonwebtoken')
const check_token = require('../check_token')
const {secret} = require('../config')


const createToken = (user_id) => {
    const pay_load = {user_id}
    token = jwt.sign(pay_load, secret, {expiresIn:"24h"})
    return token
}

const User = require('../models/User')
const Auth_token = require('../models/Auth_token')

router.route('/update/:id').post(async (req, res) => {

    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {

        const id = req.params.id
        const user = await User.findOne({ "_id": id })

        result = await user.updateOne({
        "login": req.body.login,
        "password": req.body.password,
        "email": req.body.email,
        "phone": req.body.phone,
        "name": req.body.name,
        "surname": req.body.surname,
        "age": req.body.age,
        "gender": req.body.gender,
        "roles": req.body.roles,
        "tags": req.body.tags,
        "about": req.body.about,
        "wanted": req.body.wanted,
        })

    result ? res.json({"message": "success"}) : res.json({"message": "fail"})
     } else {
        await Auth_token.deleteOne({"token": token})
        res.status(403).json({"message" : "Вы не авторизованы"})
    }

})

router.route('/signin').post(async (req, res) => {

    let user
    
    try {
        user = await User.findOne({$and:[{"login" : req.body.login}, {"password" : req.body.password}]}).exec()
        if (!user) user = await User.findOne({$and:[{"email" : req.body.email}, {"password" : req.body.password}]}).exec()
        if (!user) user = await User.findOne({$and:[{"phone" : req.body.phone}, {"password" : req.body.password}]}).exec()
        console.log(user)
        const token = createToken(user._id, user.role)
        doc = await Auth_token.create({"user_id": user._id, "token": token})
        console.log(doc)
    }
    catch (err) {
        throw err
    }

user ? res.json({"message": "success", "auth_token": token}) : res.json({"message": "Нет такого пользователя"})

})

router.route('/signup').post(async (req, res) => {
    let content = []
    try {

        user = await User.findOne({ $or:[
            {'login':req.body.login}, {'email':req.body.email},{'phone': req.body.phone}
          ]})
        if (!user){
        content = await User.create({
            "login": req.body.login,
            "password": req.body.password,
            "email": req.body.email,
            "phone": req.body.phone,
            "name": req.body.name,
            "surname": req.body.surname,
            "age": req.body.age,
            "gender": req.body.gender,
            "roles": ["user"],
            "tags": req.body.tags,
            "about": req.body.about,
            "wanted": req.body.wanted,
            })
        console.log(content)
        res.json(content)

        } else res.json({"message": "Такой пользователь существует"})
    }
    catch (err) {
        throw err
    }

})


router.route('/').post(async (req, res) => {
    let content = []
    let token = req.body.token
    let decoded = check_token(token)
    if (decoded) {
        console.log(decoded.user_id)
        try {
            content = await User.find({})
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

router.route('/by_tags').post(async (req, res) => {
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