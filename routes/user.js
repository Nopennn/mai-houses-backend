const express = require('express'),
    router = express.Router(),
    { ObjectId } = require('mongodb')

//const { Connection } = require("../ext/connection")

//const collection = "users"
//Connection.connectToMongo()

const User = require('../models/User')

router.route('/update/:id').post(async (req, res) => {

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

})

router.route('/signin').post(async (req, res) => {

    let user
    
    try {
        user = await User.findOne({$and:[{"login" : req.body.login}, {"password" : req.body.password}]}).exec()
        if (!user) user = await User.findOne({$and:[{"email" : req.body.email}, {"password" : req.body.password}]}).exec()
        if (!user) user = await User.findOne({$and:[{"phone" : req.body.phone}, {"password" : req.body.password}]}).exec()
        console.log(user)
    }
    catch (err) {
        throw err
    }

user ? res.json({"message": "success"}) : res.json({"message": "Нет такого пользователя"})

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
    try {
        content = await User.find({})
        console.log(content)
    }
    catch (err) {
        throw err
    }

	res.json(content)
})

router.route('/:id').post(async (req, res) => {

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
})



module.exports = router